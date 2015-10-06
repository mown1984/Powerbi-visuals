declare function Two(params: TwoParams): void;

interface Two {
    appendTo(element: HTMLElement): void;

    update(): void;

    makeRectangle(x: number, y: number, width: number, height: number): Two.Polygon;
    makeCircle(x: number, y: number, radius: number): Two.Polygon;
}

declare module Two {
    export var Polygon: PolygonStatic;
    export var Anchor: AnchorStatic;

    export module Types {
        let webgl: any;
        let svg: any;
        let canvas: any;
    }

    export interface Vector {
    }

    export interface Group {
    }

    export module Utils {
        export interface Collection<T> {
        }
    }

    export interface AnchorStatic {
        new (x: number, y: number): Anchor;
    }

    export interface Anchor {
    }

    export interface PolygonStatic {
        new (points: Two.Anchor[], closed: boolean, smooth: boolean): Polygon;
    }

    export interface Polygon {
        id: number;
        stroke: string;
        fill: string;
        linewidth: number;
        opacity: number;
        cap: string;
        join: string;
        miter: number;
        rotation: number;
        scale: number;
        translation: Vector,
        parent: Group,
        vertices: Utils.Collection<Anchor>,
        closed: boolean,
        curved: boolean,
        automatic: boolean,
        beginning: number,
        ending: number,
        clip: boolean,
        
        clone(): Polygon;
        center(): void;
        addTo(group: Group): void;
        remove();
        getBoundingClientRect(shallow: boolean): any; // TODO: fix
        noFill(): void;
        noStroke(): void;
        plot(): void;
        subdivide(): void;
    }
}

interface TwoParams {
    width: number;
    height: number;
    type: any;
}

declare module 'two.js' {
    export = Two;
}