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

/// <reference path="../_references.ts"/>

module powerbi.data {
    export class ConceptualSchema {
        public entities: jsCommon.ArrayNamedItems<ConceptualEntity>;
        public capabilities: ConceptualCapabilities;

        /** Indicates whether the user can edit this ConceptualSchema.  This is used to enable/disable model authoring UX. */
        public canEdit: boolean;

        public findProperty(entityName: string, propertyName: string): ConceptualProperty {
            let entity = this.entities.withName(entityName);
            if (!entity || _.isEmpty(entity.properties))
                return;

            return entity.properties.withName(propertyName);
        }

        public findHierarchy(entityName: string, name: string): ConceptualHierarchy {
            let entity = this.entities.withName(entityName);
            if (!entity || _.isEmpty(entity.hierarchies))
                return;

            return entity.hierarchies.withName(name);
        }

        /**
        * Returns the first property of the entity whose kpi is tied to kpiProperty
        */
        public findPropertyWithKpi(entityName: string, kpiProperty: ConceptualProperty): ConceptualProperty {
            debug.assertValue(kpiProperty, 'kpiProperty');

            let entity = this.entities.withName(entityName);
            if (!entity || _.isEmpty(entity.properties))
                return;

            for (let prop of entity.properties) {
                if (prop &&
                    prop.measure &&
                    prop.measure.kpi &&
                    (prop.measure.kpi.status === kpiProperty || prop.measure.kpi.goal === kpiProperty))
                    return prop;
            }

            return;
        }
    }

    export interface ConceptualCapabilities {
        discourageQueryAggregateUsage: boolean;
        supportsMedian: boolean;
        supportsPercentile: boolean;
    }

    export interface ConceptualEntity {
        name: string;
        hidden?: boolean;
        calculated?: boolean;
        queryable?: ConceptualQueryableState;
        properties: jsCommon.ArrayNamedItems<ConceptualProperty>;
        hierarchies: jsCommon.ArrayNamedItems<ConceptualHierarchy>;
    }

    export interface ConceptualProperty {
        displayName: string;
        name: string;
        type: ValueType;
        kind: ConceptualPropertyKind;
        hidden?: boolean;
        format?: string;
        column?: ConceptualColumn;
        queryable?: ConceptualQueryableState;
        measure?: ConceptualMeasure;
        kpi?: ConceptualProperty;
    }

    export interface ConceptualHierarchy {
        name: string;
        levels: jsCommon.ArrayNamedItems<ConceptualHierarchyLevel>;
        hidden?: boolean;
    }

    export interface ConceptualHierarchyLevel {
        name: string;
        column: ConceptualProperty;
        hidden?: boolean;
    }

    export interface ConceptualColumn {
        defaultAggregate?: ConceptualDefaultAggregate;
        keys?: jsCommon.ArrayNamedItems<ConceptualProperty>;
        idOnEntityKey?: boolean;
        calculated?: boolean;
        defaultValue?: SQConstantExpr;
    }

    export interface ConceptualMeasure {
        kpi?: ConceptualPropertyKpi;
    }

    export interface ConceptualPropertyKpi {
        statusGraphic: string;
        status?: ConceptualProperty;
        goal?: ConceptualProperty;
    }

    export enum ConceptualQueryableState {
        Queryable = 0,
        Error = 1,
    }

    export enum ConceptualPropertyKind {
        Column,
        Measure,
        Kpi,
    }

    export enum ConceptualDefaultAggregate {
        Default,
        None,
        Sum,
        Count,
        Min,
        Max,
        Average,
        DistinctCount,
    }

    // TODO: Remove this (replaced by ValueType)
    export enum ConceptualDataCategory {
        None,
        Address,
        City,
        Company,
        Continent,
        Country,
        County,
        Date,
        Image,
        ImageUrl,
        Latitude,
        Longitude,
        Organization,
        Place,
        PostalCode,
        Product,
        StateOrProvince,
        WebUrl,
    }
}