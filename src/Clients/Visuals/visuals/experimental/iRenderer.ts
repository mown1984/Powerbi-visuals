/// <reference path="../../_references.ts"/>

module powerbi.visuals.experimental {

    type WebGLRenderer = TwoWebGLRenderer;

    export interface IVisualRenderer {
        type: RendererType;

        setViewport(bbox: BoundingBox): void;
        finish?(): void;
    }

    export enum RendererType {
        SVG,
        Canvas,
        WebGL,
        TwoJS,
        PIXI,
    }

    export class SvgRenderer implements IVisualRenderer {
        private element: D3.Selection;

        public type: RendererType = RendererType.SVG;

        constructor(element: JQuery) {
            this.element = d3.select(element.get(0)).append('svg');
        }

        public setViewport(bbox: BoundingBox) {
            this.element.attr({
                width: bbox.width,
                height: bbox.height,
            });

            //this.element.style({
            //    position: "relative",
            //    top: bbox.top + "px",
            //    left: bbox.left + "px",
            //});
        }

        public getElement(): D3.Selection {
            return this.element;
        }
    }

    export class CanvasRenderer implements IVisualRenderer {
        private canvasElement: JQuery;
        private canvasContext: CanvasRenderingContext2D;

        public type: RendererType = RendererType.Canvas;

        constructor(element: JQuery) {
            this.canvasElement = $('<canvas>');
            element.append(this.canvasElement);
            
            let canvasNode = <HTMLCanvasElement>this.canvasElement.get(0);
            this.canvasContext = canvasNode.getContext('2d');
        }

        public setViewport(bbox: BoundingBox) {
            this.canvasElement.attr({
                width: bbox.width,
                height: bbox.height,
            });

            //this.canvasElement.css({
            //    position: "relative",
            //    top: bbox.top + "px",
            //    left: bbox.left + "px",
            //});
        }

        public getCanvasContext(): CanvasRenderingContext2D {
            return this.canvasContext;
        }
    }

    export class TwoWebGLRenderer implements IVisualRenderer {
        private container: JQuery;
        private two: Two;

        public type: RendererType = RendererType.TwoJS;

        constructor(element: JQuery) {
            this.container = $('<div>');
            element.append(this.container);

            this.container.empty();

            let params: TwoParams = {
                width: 0,
                height: 0,
                type: Two.Types.webgl,
            };
            this.two = new Two(params);
            this.two.appendTo(this.container.get(0));
        }

        public setViewport(bbox: BoundingBox) {
            let two = <any>this.two;  // TODO: update d.ts
            two.renderer.setSize(bbox.width, bbox.height);
            two.width = two.renderer.width;
            two.height = two.renderer.height;
        }

        public createGraphics(): Two {
            return this.two;
        }

        public finish() {
            this.two.update();
        }
    }

    // https://cdnjs.cloudflare.com/ajax/libs/pixi.js/3.0.7/pixi.min.js
    export class PixiWebGLRenderer implements IVisualRenderer {
        private container: JQuery;
        private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
        private displayObj: PIXI.Container;

        public type: RendererType = RendererType.PIXI;

        constructor(element: JQuery) {
            this.container = $('<div>');
            element.append(this.container);

            let width = element.outerWidth(true) || 100;
            let height = element.outerHeight(true) || 100;

            this.renderer = PIXI.autoDetectRenderer(width, height, { antialias: true, backgroundColor: 0xffffff });
            this.container.append(this.renderer.view);

            this.animate();
        }

        public setViewport(bbox: BoundingBox) {
            this.container.attr({
                width: bbox.width,
                height: bbox.height,
            });

            //this.canvasElement.css({
            //    position: "relative",
            //    top: bbox.top + "px",
            //    left: bbox.left + "px",
            //});

            //this.renderer.width = bbox.width;
            //this.renderer.height = bbox.height;
            this.renderer.resize(bbox.width, bbox.height);
        }

        public createGraphics(): PIXI.Graphics {
            return new PIXI.Graphics();
        }

        public render(graphics: PIXI.Graphics) {
            this.displayObj = new PIXI.Container();
            this.displayObj.addChild(graphics);

            //this.renderer.render(this.displayObj);
        }

        private animate() {
            if (this.renderer && this.displayObj)
                this.renderer.render(this.displayObj);

            requestAnimationFrame(() => this.animate());
        }
    }

    export class MinimalWebGLRenderer implements IVisualRenderer {
        private canvasElement: JQuery;
        private gl: WebGLRenderingContext;
        
        public type = RendererType.WebGL;

        // TODO: better way to do this? Should the renderer hold on to the shaders
        public bbox: BoundingBox;

        constructor(element: JQuery) {
            this.canvasElement = $('<canvas>');
            element.append(this.canvasElement);

            let canvas = <HTMLCanvasElement>this.canvasElement.get(0);

            this.gl = canvas.getContext("experimental-webgl");
            if (!this.gl)
                return;

            //this.setViewport(100, 100);
        }

        public getGL(): WebGLRenderingContext {
            return this.gl;
        }

        public setViewport(bbox: BoundingBox) {
            this.bbox = bbox;
            this.canvasElement.attr({
                width: bbox.width,
                height: bbox.height,
            });
            
            this.gl.viewport(0, 0, bbox.width, bbox.height);
        }

        public buildProgram(vshader: WebGL.Shader, fshader: WebGL.Shader): WebGLProgram {
            let gl = this.gl;

            let vertexShader: WebGLShader;
            let fragmentShader: WebGLShader;
            let program: WebGLProgram;

            vertexShader = this.compileShader(gl, gl.VERTEX_SHADER, vshader.getSource());
            if (vertexShader) {
                fragmentShader = this.compileShader(gl, gl.FRAGMENT_SHADER, fshader.getSource());
                if (fragmentShader) {
                    program = this.createProgram(gl, vertexShader, fragmentShader);
                    if (program) {
                        vshader.init(gl, program);
                        fshader.init(gl, program);
                        return program;
                    }
                }
            }

            // If anything failed, clean up
            if (program)
                gl.deleteProgram(program);
            if (vertexShader)
                gl.deleteShader(vertexShader);
            if (fragmentShader)
                gl.deleteShader(fragmentShader);
        }

        public createProgram(gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) {
            let program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
                return;
            }

            return program;
        }

        public compileShader(gl: WebGLRenderingContext, shaderType: number, source: string): WebGLShader {
            let shader = gl.createShader(shaderType);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                return;
            }

            return shader;
        }
        
        public clear() {
            let gl = this.gl;
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.clearColor(1.0, 1.0, 1.0, 1.0);
        }

        public finish() {
            // TODO: needed?
            this.gl.flush();
        }
    }

    export module WebGL {

        export interface Texture {
            texture: WebGLTexture;
            unit: number;
        }

        export interface Shader {
            getSource(): string;
            init(gl: WebGLRenderingContext, program: WebGLProgram): void;
        }

        export class DefaultVertexShader implements Shader {
            private aPosition: number;
            private aTexCoord: number;
            private aColor: number;
            private aRadius: number;  // NOTE: for CircleFragmentShader
            private uResolution: WebGLUniformLocation;

            public init(gl: WebGLRenderingContext, program: WebGLProgram) {
                this.aPosition = gl.getAttribLocation(program, "a_position");
                this.aTexCoord = gl.getAttribLocation(program, "a_texcoord");
                this.aColor = gl.getAttribLocation(program, "a_color");
                this.aRadius = gl.getAttribLocation(program, "a_radius");
                this.uResolution = gl.getUniformLocation(program, "u_resolution");
            }

            public setAttributes(gl: WebGLRenderingContext, vertexBuffer: WebGLBuffer, colorBuffer: WebGLBuffer, texCoordBuffer: WebGLBuffer, radiusBuffer: WebGLBuffer) {
                if (colorBuffer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
                    gl.vertexAttribPointer(this.aColor, 4, gl.FLOAT, false, 0, 0);
                    gl.enableVertexAttribArray(this.aColor);
                }  // TODO: disable somehow?

                if (texCoordBuffer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
                    gl.vertexAttribPointer(this.aTexCoord, 2, gl.FLOAT, false, 0, 0);
                    gl.enableVertexAttribArray(this.aTexCoord);
                }

                if (radiusBuffer) {
                    gl.bindBuffer(gl.ARRAY_BUFFER, radiusBuffer);
                    gl.vertexAttribPointer(this.aRadius, 1, gl.FLOAT, false, 0, 0);
                    gl.enableVertexAttribArray(this.aRadius);
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                gl.vertexAttribPointer(this.aPosition, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(this.aPosition);
            }

            public setUniforms(gl: WebGLRenderingContext, bbox: BoundingBox) {
                gl.uniform2f(this.uResolution, bbox.width, bbox.height);
            }

            public getSource(): string {
                return [
                    "attribute vec2 a_position;",
                    "attribute vec2 a_texcoord;",
                    "attribute vec4 a_color;",
                    "attribute float a_radius;",
                    "uniform vec2 u_resolution;",
                    "varying vec4 v_color;",
                    "varying vec2 v_texcoord;",
                    "varying float v_radius;",
                    "void main(void) {",
                //"    gl_PointSize = 20.0;",
                    "    vec2 zeroToOne = a_position / u_resolution;",
                    "    vec2 zeroToTwo = zeroToOne * 2.0;",
                    "    vec2 clipSpace = zeroToTwo - 1.0;",
                    "    gl_Position = vec4(clipSpace, 0, 1);",
                    "    v_color = a_color;",
                    "    v_texcoord = a_texcoord;",
                    "    v_radius = a_radius;",
                    "}",
                ].join("\n");
            }
        }

        export class DefaultFragmentShader implements Shader {
            public init(gl: WebGLRenderingContext, program: WebGLProgram) {
            }

            public getSource(): string {
                return [
                    "#ifdef GL_ES",
                    "  precision highp float;",
                    "#endif",
                    "varying vec4 v_color;",
                    "void main(void) {",
                    "    gl_FragColor = v_color;",
                    "}"
                ].join("\n");
            }
        }

        export class CircleFragmentShader implements Shader {
            public init(gl: WebGLRenderingContext, program: WebGLProgram) {
            }

            // TODO: could probably use fragCoord / resolution rather than texcoords
            public getSource(): string {
                return [
                    "#ifdef GL_ES",
                    "  precision highp float;",
                    "#endif",
                    "varying vec4 v_color;",
                    "varying vec2 v_texcoord;",
                    "varying float v_radius;",
                    "void main(void) {",
                    "    vec2 center = vec2(0.5, 0.5) * v_radius * 2.0;",
                    "    vec2 uv = v_texcoord * v_radius * 2.0;",
                    "    float d = length(center - uv) - v_radius;",
                    "    float t = clamp(d, 0.0, 1.0);",
                    "    vec4 c = vec4(v_color.rgb, 1.0 - t);",
                    "    gl_FragColor = c;",
                    "}"
                ].join("\n");
            }
        }

        // TODO: not sure this works...
        export class TextureFragmentShader implements Shader {
            private uTexture: WebGLUniformLocation;

            public init(gl: WebGLRenderingContext, program: WebGLProgram) {
                this.uTexture = gl.getUniformLocation(program, "u_texture");
            }

            public setUniforms(gl: WebGLRenderingContext, texture: Texture) {
                gl.uniform1i(this.uTexture, texture.unit);
                gl.activeTexture(gl.TEXTURE0 + texture.unit);
                gl.bindTexture(gl.TEXTURE_2D, texture.texture);
            }

            public getSource(): string {
                return [
                    "#ifdef GL_ES",
                    "  precision highp float;",
                    "#endif",
                    "varying vec4 v_color;",
                    "varying vec2 v_texcoord;",
                    "uniform sampler2D u_texture;",  // TODO: don't think i need this with no image
                    "void main(void) {",
                    "    gl_FragColor = texture2D(u_texture, v_texcoord);",
                    "}"
                ].join("\n");
            }
        }
    }
}