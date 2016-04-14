/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved. 
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *   
 *  The above copyright notice and this permission notice shall be included in 
 *  all copies or substantial portions of the Software.
 *   
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.data {
    /** Represents common expression patterns for 'field' expressions such as columns, column aggregates, measures, etc. */
    export interface FieldExprPattern {
        column?: FieldExprColumnPattern;
        columnAggr?: FieldExprColumnAggrPattern;
        columnHierarchyLevelVariation?: FieldExprColumnHierarchyLevelVariationPattern;
        entity?: FieldExprEntityPattern;
        entityAggr?: FieldExprEntityAggrPattern;
        hierarchy?: FieldExprHierarchyPattern;
        hierarchyLevel?: FieldExprHierarchyLevelPattern;
        hierarchyLevelAggr?: FieldExprHierarchyLevelAggrPattern;
        measure?: FieldExprMeasurePattern;
    }

    /** By design there is no default, no-op visitor. Components concerned with patterns need to be aware of all patterns as they are added. */
    export interface IFieldExprPatternVisitor<T> {
        visitColumn(column: FieldExprColumnPattern): T;
        visitColumnAggr(columnAggr: FieldExprColumnAggrPattern): T;
        visitColumnHierarchyLevelVariation(columnHierarchyLevelVariation: FieldExprColumnHierarchyLevelVariationPattern): T;
        visitEntity(entity: FieldExprEntityPattern): T;
        visitEntityAggr(entityAggr: FieldExprEntityAggrPattern): T;
        visitHierarchy(hierarchy: FieldExprHierarchyPattern): T;
        visitHierarchyLevel(hierarchyLevel: FieldExprHierarchyLevelPattern): T;
        visitHierarchyLevelAggr(hierarchyLevelAggr: FieldExprHierarchyLevelAggrPattern): T;
        visitMeasure(measure: FieldExprMeasurePattern): T;
    }

    export interface FieldExprEntityPattern {
        schema: string;
        entity: string;
        entityVar?: string;
    }

    export interface FieldExprEntityItemPattern extends FieldExprEntityPattern {
    }

    export interface FieldExprEntityPropertyPattern extends FieldExprEntityItemPattern {
        name: string;
    }

    export type FieldExprColumnPattern = FieldExprEntityPropertyPattern;
    export type FieldExprMeasurePattern = FieldExprEntityPropertyPattern;
    export type FieldExprHierarchyPattern = FieldExprEntityPropertyPattern;

    export type FieldExprPropertyPattern = FieldExprColumnPattern | FieldExprMeasurePattern | FieldExprHierarchyPattern;

    export interface FieldExprEntityAggrPattern extends FieldExprEntityPattern {
        aggregate: QueryAggregateFunction;
    }

    export interface FieldExprColumnAggrPattern extends FieldExprColumnPattern {
        aggregate: QueryAggregateFunction;
    }

    export interface FieldExprHierarchyLevelPattern extends FieldExprEntityItemPattern {
        name: string;
        level: string;
    }

    export interface FieldExprHierarchyLevelAggrPattern extends FieldExprHierarchyLevelPattern {
        aggregate: QueryAggregateFunction;
    }

    export interface FieldExprColumnHierarchyLevelVariationPattern {
        source: FieldExprColumnPattern;
        level: FieldExprHierarchyLevelPattern;
        variationName: string;
    }

    export module SQExprBuilder {
        export function fieldExpr(fieldExpr: FieldExprPattern): SQExpr {
            let sqExpr = FieldExprPattern.visit<SQExpr>(fieldExpr, FieldExprToSQExprVisitor.instance);
            debug.assertValue(sqExpr, 'Failed to convert FieldExprPattern into SQExpr');
            return sqExpr;
        }

        class FieldExprToSQExprVisitor implements IFieldExprPatternVisitor<SQExpr> {
            public static instance: FieldExprToSQExprVisitor = new FieldExprToSQExprVisitor();

            public visitColumn(column: FieldExprColumnPattern): SQColumnRefExpr {
                return columnRef(this.visitEntity(column), column.name);
            }

            public visitColumnAggr(columnAggr: FieldExprColumnAggrPattern): SQAggregationExpr {
                return aggregate(this.visitColumn(columnAggr), columnAggr.aggregate);
            }

            public visitColumnHierarchyLevelVariation(columnHierarchyLevelVariationPattern: FieldExprColumnHierarchyLevelVariationPattern): SQPropertyVariationSourceExpr {
                return propertyVariationSource(
                    this.visitEntity(columnHierarchyLevelVariationPattern.source),
                    columnHierarchyLevelVariationPattern.source.name,
                    columnHierarchyLevelVariationPattern.level.name);
            }

            public visitEntity(entityPattern: FieldExprEntityPattern): SQEntityExpr {
                return entity(entityPattern.schema, entityPattern.entity, entityPattern.entityVar);
            }

            public visitEntityAggr(entityAggr: FieldExprEntityAggrPattern): SQAggregationExpr {
                return aggregate(this.visitEntity(entityAggr), entityAggr.aggregate);
            }

            public visitHierarchy(hierarchyPattern: FieldExprHierarchyPattern): SQHierarchyExpr {
                return hierarchy(this.visitEntity(hierarchyPattern), hierarchyPattern.name);
            }

            public visitHierarchyLevel(level: FieldExprHierarchyLevelPattern): SQHierarchyLevelExpr {
                return hierarchyLevel(this.visitHierarchy(level), level.level);
            }

            public visitHierarchyLevelAggr(hierarchyLevelAggr: FieldExprHierarchyLevelAggrPattern): SQAggregationExpr {
                return aggregate(this.visitHierarchyLevel(hierarchyLevelAggr), hierarchyLevelAggr.aggregate);
            }

            public visitMeasure(measure: FieldExprMeasurePattern): SQMeasureRefExpr {
                return measureRef(this.visitEntity(measure), measure.name);
            }
        }
    }

    export module SQExprConverter {
        export function asFieldPattern(sqExpr: SQExpr): FieldExprPattern {
            return sqExpr.accept(FieldExprPatternBuilder.instance);
        }
    }

    interface FieldExprSourceVariationPattern {
        column: FieldExprColumnPattern;
        variationName: string;
    }

    interface SourceExprPattern {
        entity?: FieldExprEntityPattern;

        // TODO: Change FieldExprHierarchyPattern to FieldExprHierarchyLevelPattern
        hierarchy?: FieldExprHierarchyPattern;
        variation?: FieldExprSourceVariationPattern;
    }

    interface HierarchySourceExprPattern {
        hierarchy: FieldExprHierarchyPattern;
        variation?: FieldExprSourceVariationPattern;
    }

    class FieldExprPatternBuilder extends DefaultSQExprVisitor<FieldExprPattern> {
        public static instance: FieldExprPatternBuilder = new FieldExprPatternBuilder();

        public visitColumnRef(expr: SQColumnRefExpr): FieldExprPattern {
            let sourceRef = expr.source.accept(SourceExprPatternBuilder.instance);
            if (!sourceRef)
                return;

            if (sourceRef.entity) {
                let columnRef = <FieldExprColumnPattern>sourceRef.entity;
                columnRef.name = expr.ref;

                return { column: columnRef };
            }
        }

        public visitMeasureRef(expr: SQMeasureRefExpr): FieldExprPattern {
            let sourceRef = expr.source.accept(SourceExprPatternBuilder.instance);
            if (!sourceRef)
                return;

            if (sourceRef.entity) {
                let measureRef = <FieldExprMeasurePattern>sourceRef.entity;
                measureRef.name = expr.ref;

                return { measure: measureRef };
            }
        }

        public visitEntity(expr: SQEntityExpr): FieldExprPattern {
            let entityRef: FieldExprEntityPattern = {
                schema: expr.schema,
                entity: expr.entity
            };
            if (expr.variable)
                entityRef.entityVar = expr.variable;

            return { entity: entityRef };
        }

        public visitAggr(expr: SQAggregationExpr): FieldExprPattern {
            let fieldPattern: FieldExprPattern = expr.arg.accept(this);
            if (fieldPattern && fieldPattern.column) {
                let argAggr = <FieldExprColumnAggrPattern>fieldPattern.column;
                argAggr.aggregate = expr.func;
                return { columnAggr: argAggr };
            } else if (fieldPattern && fieldPattern.columnAggr) {
                let argAggr = <FieldExprColumnAggrPattern>fieldPattern.columnAggr;
                argAggr.aggregate = expr.func;
                return { columnAggr: argAggr };
            } else if (fieldPattern && fieldPattern.hierarchyLevel) {
                let argAggr = <FieldExprHierarchyLevelAggrPattern>fieldPattern.hierarchyLevel;
                argAggr.aggregate = expr.func;
                return { hierarchyLevelAggr: argAggr };
            }

            let sourcePattern = expr.arg.accept(SourceExprPatternBuilder.instance);
            if (sourcePattern && sourcePattern.entity) {
                let argAggr = <FieldExprEntityAggrPattern>sourcePattern.entity;
                argAggr.aggregate = expr.func;

                return { entityAggr: argAggr };
            }
        }

        public visitHierarchy(expr: SQHierarchyExpr): FieldExprPattern {
            let sourcePattern = expr.arg.accept(SourceExprPatternBuilder.instance);

            if (sourcePattern && sourcePattern.entity) {
                let hierarchyRef = <FieldExprHierarchyPattern>(sourcePattern.entity);
                hierarchyRef.name = expr.hierarchy;
                return { hierarchy: hierarchyRef };
            }
        }

        public visitHierarchyLevel(expr: SQHierarchyLevelExpr): FieldExprPattern {
            let hierarchySourceExprPattern: HierarchySourceExprPattern = expr.arg.accept(HierarchyExprPatternBuiler.instance);
            if (!hierarchySourceExprPattern)
                return;

            let hierarchyLevel: FieldExprHierarchyLevelPattern;
            if (hierarchySourceExprPattern.hierarchy) {
                hierarchyLevel = {
                    entity: hierarchySourceExprPattern.hierarchy.entity,
                    schema: hierarchySourceExprPattern.hierarchy.schema,
                    name: hierarchySourceExprPattern.hierarchy.name,
                    level: expr.level,
                };
            }

            if (hierarchySourceExprPattern.variation) {
                return {
                    columnHierarchyLevelVariation: {
                        source: {
                            entity: hierarchySourceExprPattern.variation.column.entity,
                            schema: hierarchySourceExprPattern.variation.column.schema,
                            name: hierarchySourceExprPattern.variation.column.name,
                        },
                        level: hierarchyLevel,
                        variationName: hierarchySourceExprPattern.variation.variationName,
                    }
                };
            }

            return { hierarchyLevel: hierarchyLevel };
        }
    }

    class SourceExprPatternBuilder extends DefaultSQExprVisitor<SourceExprPattern> {
        public static instance: SourceExprPatternBuilder = new SourceExprPatternBuilder();

        public visitEntity(expr: SQEntityExpr): SourceExprPattern {
            let entityRef: FieldExprEntityPattern = {
                schema: expr.schema,
                entity: expr.entity
            };
            if (expr.variable)
                entityRef.entityVar = expr.variable;

            return { entity: entityRef };
        }

        public visitPropertyVariationSource(expr: SQPropertyVariationSourceExpr): SourceExprPattern {
            let entityExpr = <SQEntityExpr>expr.arg;

            if (entityExpr instanceof SQEntityExpr) {
                let propertyVariationSource: FieldExprColumnPattern = {
                    schema: entityExpr.schema,
                    entity: entityExpr.entity,
                    name: expr.property,
                };

                if (entityExpr.variable)
                    propertyVariationSource.entityVar = entityExpr.variable;

                return {
                    variation: {
                        column: propertyVariationSource,
                        variationName: expr.name,
                    }
                };
            }
        }
    }

    class HierarchyExprPatternBuiler extends DefaultSQExprVisitor<HierarchySourceExprPattern> {
        public static instance: HierarchyExprPatternBuiler = new HierarchyExprPatternBuiler();

        public visitHierarchy(expr: SQHierarchyExpr): HierarchySourceExprPattern {
            let exprPattern = expr.arg.accept(SourceExprPatternBuilder.instance);
            let hierarchyRef: FieldExprHierarchyPattern;
            let variationRef: FieldExprSourceVariationPattern;

            if (exprPattern.variation) {
                hierarchyRef = {
                    name: expr.hierarchy,
                    schema: exprPattern.variation.column.schema,
                    entity: exprPattern.variation.column.entity,
                };
                variationRef = exprPattern.variation;
            }
            else
                hierarchyRef = {
                    name: expr.hierarchy,
                    schema: exprPattern.entity.schema,
                    entity: exprPattern.entity.entity,
                };

            return {
                hierarchy: hierarchyRef,
                variation: variationRef
            };
        }
    }

    export module FieldExprPattern {

        export function visit<T>(expr: SQExpr | FieldExprPattern, visitor: IFieldExprPatternVisitor<T>): T {
            debug.assertValue(expr, 'expr');
            debug.assertValue(visitor, 'visitor');

            let fieldExprPattern = expr instanceof SQExpr ? SQExprConverter.asFieldPattern(expr) : expr;
            debug.assertValue(fieldExprPattern, 'expected sqExpr to conform to a fieldExprPattern');

            if (fieldExprPattern.column)
                return visitColumn(fieldExprPattern.column, visitor);
            if (fieldExprPattern.columnAggr)
                return visitColumnAggr(fieldExprPattern.columnAggr, visitor);
            if (fieldExprPattern.columnHierarchyLevelVariation)
                return visitColumnHierarchyLevelVariation(fieldExprPattern.columnHierarchyLevelVariation, visitor);
            if (fieldExprPattern.entity)
                return visitEntity(fieldExprPattern.entity, visitor);
            if (fieldExprPattern.entityAggr)
                return visitEntityAggr(fieldExprPattern.entityAggr, visitor);
            if (fieldExprPattern.hierarchy)
                return visitHierarchy(fieldExprPattern.hierarchy, visitor);
            if (fieldExprPattern.hierarchyLevel)
                return visitHierarchyLevel(fieldExprPattern.hierarchyLevel, visitor);
            if (fieldExprPattern.hierarchyLevelAggr)
                return visitHierarchyLevelAggr(fieldExprPattern.hierarchyLevelAggr, visitor);
            if (fieldExprPattern.measure)
                return visitMeasure(fieldExprPattern.measure, visitor);

            debug.assertFail('failed to visit a fieldExprPattern.');
            return;
        }

        function visitColumn<T>(column: FieldExprColumnPattern, visitor: IFieldExprPatternVisitor<T>): T {
            debug.assertValue(column, 'column');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitColumn(column);
        }

        function visitColumnAggr<T>(columnAggr: FieldExprColumnAggrPattern, visitor: IFieldExprPatternVisitor<T>): T{
            debug.assertValue(columnAggr, 'columnAggr');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitColumnAggr(columnAggr);
        }

        function visitColumnHierarchyLevelVariation<T>(
            columnHierarchyLevelVariation: FieldExprColumnHierarchyLevelVariationPattern,
            visitor: IFieldExprPatternVisitor<T>): T{

            debug.assertValue(columnHierarchyLevelVariation, 'columnHierarchyLevelVariation');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitColumnHierarchyLevelVariation(columnHierarchyLevelVariation);
        }

        function visitEntity<T>(entity: FieldExprEntityPattern, visitor: IFieldExprPatternVisitor<T>): T{
            debug.assertValue(entity, 'entity');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitEntity(entity);
        }
        
        function visitEntityAggr<T>(entityAggr: FieldExprEntityAggrPattern, visitor: IFieldExprPatternVisitor<T>): T{
            debug.assertValue(entityAggr, 'entityAggr');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitEntityAggr(entityAggr);
        }

        function visitHierarchy<T>(hierarchy: FieldExprHierarchyPattern, visitor: IFieldExprPatternVisitor<T>): T{
            debug.assertValue(hierarchy, 'hierarchy');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitHierarchy(hierarchy);
        }

        function visitHierarchyLevel<T>(hierarchyLevel: FieldExprHierarchyLevelPattern, visitor: IFieldExprPatternVisitor<T>): T{
            debug.assertValue(hierarchyLevel, 'hierarchyLevel');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitHierarchyLevel(hierarchyLevel);
        }

        function visitHierarchyLevelAggr<T>(hierarchyLevelAggr: FieldExprHierarchyLevelAggrPattern, visitor: IFieldExprPatternVisitor<T>): T{
            debug.assertValue(hierarchyLevelAggr, 'hierarchyLevelAggr');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitHierarchyLevelAggr(hierarchyLevelAggr);
        }

        function visitMeasure<T>(measure: FieldExprMeasurePattern, visitor: IFieldExprPatternVisitor<T>): T{
            debug.assertValue(measure, 'measure');
            debug.assertValue(visitor, 'visitor');

            return visitor.visitMeasure(measure);
        }

        export function toColumnRefSQExpr(columnPattern: FieldExprColumnPattern): SQColumnRefExpr {
            return SQExprBuilder.columnRef(
                SQExprBuilder.entity(columnPattern.schema, columnPattern.entity, columnPattern.entityVar),
                columnPattern.name);
        }

        export function hasFieldExprName(fieldExpr: FieldExprPattern): boolean {
            return (fieldExpr.column ||
                fieldExpr.columnAggr ||
                fieldExpr.measure) !== undefined;
        }

        export function getPropertyName(fieldExpr: FieldExprPattern): string {
            let column = (fieldExpr.column ||
                fieldExpr.columnAggr ||
                fieldExpr.measure);

            if (column)
                return column.name;
        }

        export function getHierarchyName(fieldExpr: FieldExprPattern): string {
            let hierarchy = fieldExpr.hierarchy;
            if (hierarchy)
                return hierarchy.name;
        }

        export function getColumnRef(fieldExpr: FieldExprPattern): FieldExprPropertyPattern {
            if (fieldExpr.columnHierarchyLevelVariation)
                return fieldExpr.columnHierarchyLevelVariation.source;

            return fieldExpr.column || fieldExpr.measure || fieldExpr.columnAggr;
        }

        export function getFieldExprName(fieldExpr: FieldExprPattern): string {
            let name = getPropertyName(fieldExpr);

            if (name)
                return name;

            // In case it is an entity
            return toFieldExprEntityPattern(fieldExpr).entity;
        }

        export function toFieldExprEntityPattern(fieldExpr: FieldExprPattern): FieldExprEntityPattern {
            return FieldExprPattern.visit(fieldExpr, FieldExprToEntityExprPatternBuilder.instance);
        }

        export function toFieldExprEntityItemPattern(fieldExpr: FieldExprPattern): FieldExprEntityPattern {
            return FieldExprPattern.visit(fieldExpr, FieldExprToEntityExprPatternBuilder.instance);
        }

        class FieldExprToEntityExprPatternBuilder implements IFieldExprPatternVisitor<FieldExprEntityItemPattern> {
            public static instance: FieldExprToEntityExprPatternBuilder = new FieldExprToEntityExprPatternBuilder();

            public visitColumn(column: FieldExprColumnPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(column);
            }

            public visitColumnAggr(columnAggr: FieldExprColumnAggrPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(columnAggr);
            }

            public visitColumnHierarchyLevelVariation(columnHierarchyLevelVariation: FieldExprColumnHierarchyLevelVariationPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(columnHierarchyLevelVariation.source);
            }

            public visitEntity(entity: FieldExprEntityPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(entity);
            }

            public visitEntityAggr(entityAggr: FieldExprEntityAggrPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(entityAggr);
            }

            public visitHierarchy(hierarchy: FieldExprHierarchyPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(hierarchy);
            }

            public visitHierarchyLevel(hierarchyLevel: FieldExprHierarchyLevelPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(hierarchyLevel);
            }

            public visitHierarchyLevelAggr(hierarchyLevelAggr: FieldExprHierarchyLevelAggrPattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(hierarchyLevelAggr);
            }

            public visitMeasure(measure: FieldExprMeasurePattern): FieldExprEntityItemPattern {
                return FieldExprToEntityExprPatternBuilder.toEntityItemExprPattern(measure);
            }

            private static toEntityItemExprPattern(exprPattern: FieldExprEntityItemPattern): FieldExprEntityItemPattern {
                debug.assertValue(exprPattern, 'exprPattern');

                let pattern: FieldExprEntityItemPattern = { schema: exprPattern.schema, entity: exprPattern.entity };

                if (exprPattern.entityVar) {
                    pattern.entityVar = exprPattern.entityVar;
                }

                return pattern;
            }
        }
    }
}