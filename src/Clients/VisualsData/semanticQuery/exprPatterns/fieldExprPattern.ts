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

/// <reference path="../../_references.ts"/>

module powerbi.data {
    /** Represents common expression patterns for 'field' expressions such as columns, column aggregates, measures, etc. */
    export interface FieldExprPattern {
        column?: FieldExprColumnPattern;
        columnAggr?: FieldExprColumnAggrPattern;
        // columnVariation?: FieldExprColumnVariationPattern;  // TODO: Implement this for Time Intelligence.
        entityAggr?: FieldExprEntityAggrPattern;
        hierarchyLevel?: FieldExprHierarchyLevelPattern;
        hierarchy?: FieldExprHierarchyPattern;
        measure?: FieldExprMeasurePattern;
    }

    export interface FieldExprEntityItemPattern {
        schema: string;
        entity: string;
        entityVar?: string;
    }

    export interface FieldExprPropertyPattern extends FieldExprEntityItemPattern {
        name: string;
    }

    export type FieldExprColumnPattern = FieldExprPropertyPattern;

    export interface FieldExprColumnAggrPattern extends FieldExprColumnPattern {
        aggregate: QueryAggregateFunction;
    }

    export module SQExprBuilder {
        export function fieldExpr(fieldExpr: FieldExprPattern): SQExpr {
            return wrapColumnAggr(fieldExpr)
                || wrapColumn(fieldExpr)
                || wrapMeasure(fieldExpr)
                || wrapHierarchyLevel(fieldExpr)
                || wrapHierarchy(fieldExpr)
                || wrapEntityAggr(fieldExpr)
                || wrapEntity(fieldExpr);
        }

        function wrapColumnAggr(fieldExpr: FieldExprPattern): SQExpr {
            var aggr = fieldExpr.columnAggr;
            if (aggr) {
                var entityExpr = wrapEntity(fieldExpr.columnAggr);
                return aggregate(columnRef(entityExpr, aggr.name), aggr.aggregate);
            }
        }

        function wrapHierarchyLevel(fieldExpr: FieldExprPattern): SQExpr {
            //var aggr = fieldExpr.hierarchyLevel;
            return null;
        }

        function wrapHierarchy(fieldExpr: FieldExprPattern): SQExpr {
            //var aggr = fieldExpr.hierarchy;
            return null;
        }

        function wrapColumn(fieldExpr: FieldExprPattern): SQExpr {
            var column = fieldExpr.column;
            if (column) {
                var entityExpr = wrapEntity(fieldExpr.column);
                return columnRef(entityExpr, column.name);
            }
        }

        function wrapMeasure(fieldExpr: FieldExprPattern): SQExpr {
            var measure = fieldExpr.measure;
            if (measure) {
                var entityExpr = wrapEntity(fieldExpr.measure);
                return measureRef(entityExpr, measure.name);
            }
        }

        function wrapEntityAggr(fieldExpr: FieldExprPattern): SQExpr {
            var entityAggregate = fieldExpr.entityAggr;

            if (entityAggregate) {
                var entityExpr = wrapEntity(fieldExpr.entityAggr);
                return aggregate(entityExpr, entityAggregate.aggregate);
            }
        }

        function wrapEntity(fieldExpr: FieldExprPattern): SQExpr {
            let fieldExprEntityItemPattern = FieldExprPattern.toFieldExprEntityItemPattern(fieldExpr);
            return entity(fieldExprEntityItemPattern.schema, fieldExprEntityItemPattern.entity, fieldExprEntityItemPattern.entityVar);
        }
    }

    // TODO: Implement this for Time Intelligence.
    //export interface FieldExprColumnVariationPattern extends FieldExprEntityItemPattern {
    //    variationSource: FieldExprColumnPattern;
    //    name: string;
    //}

    export interface FieldExprEntityAggrPattern extends FieldExprEntityItemPattern {
        aggregate: QueryAggregateFunction;
    }

    export interface FieldExprHierarchyLevelPattern {
    }

    export interface FieldExprHierarchyPattern {
    }

    export type FieldExprMeasurePattern = FieldExprPropertyPattern;

    export module SQExprConverter {
        export function asFieldPattern(sqExpr: SQExpr): FieldExprPattern {
            return sqExpr.accept(FieldExprPatternBuilder.instance);
        }
    }

    interface SourceExprPattern {
        entity?: FieldExprEntityItemPattern;
        //variation?: FieldExprColumnPattern;
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
            }

            let sourcePattern = expr.arg.accept(SourceExprPatternBuilder.instance);
            if (sourcePattern && sourcePattern.entity) {
                let argAggr = <FieldExprEntityAggrPattern>sourcePattern.entity;
                argAggr.aggregate = expr.func;

                return { entityAggr: argAggr };
            }
        }
    }

    class SourceExprPatternBuilder extends DefaultSQExprVisitor<SourceExprPattern> {
        public static instance: SourceExprPatternBuilder = new SourceExprPatternBuilder();

        public visitEntity(expr: SQEntityExpr): SourceExprPattern {
            let entityRef: FieldExprEntityItemPattern = {
                schema: expr.schema,
                entity: expr.entity
            };
            if (expr.variable)
                entityRef.entityVar = expr.variable;

            return { entity: entityRef };
        }
    }

    export module FieldExprPattern {
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

        export function getFieldExprName(fieldExpr: FieldExprPattern): string {
            let name = getPropertyName(fieldExpr);

            if (name)
                return name;

            // In case it is an entity
            return toFieldExprEntityItemPattern(fieldExpr).entity;
        }

        export function toFieldExprEntityItemPattern(fieldExpr: FieldExprPattern): FieldExprEntityItemPattern {
            var field = <FieldExprEntityItemPattern>(fieldExpr.column ||
                fieldExpr.columnAggr ||
                fieldExpr.entityAggr ||
                fieldExpr.hierarchy ||
                fieldExpr.hierarchyLevel ||
                fieldExpr.measure ||
                fieldExpr); // fieldExpr for entity

            return {
                schema: field.schema,
                entity: field.entity,
                entityVar: field.entityVar,
            };
        }
    }
}