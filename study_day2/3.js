

/*
Global Variables : View, resources, Uniform, Dimensions
*/

//const SHADER = "shader/3_operations_1.glsl";
const SHADER = "shader/3_operations_2.glsl";


const view = document.querySelector('.view');

let width, height, app, background, uniforms;
const resources = PIXI.Loader.shared.resources;

function initDimensions() {
    width = window.innerWidth;
    height = window.innerHeight;
}

function initUniforms() {
    // Uniforms are the variables that are passed to the shader
    uniforms = {
        uresolution: [width, height],
        u_time: 0.0,
        u_mouse: new PIXI.Point(0.0, 0.0),
    }
}

function initApp() {
    app = new PIXI.Application({ view })
    app.renderer.autoDensity = true
    app.renderer.resize(width, height)
}

function initBackground() {
    background = new PIXI.Sprite();
    background.width = width;
    background.height = height;

    // apply background shader here.

    const backgroundFragmentShader = resources[SHADER].data;
    const backgroundShader = new PIXI.Filter(undefined, backgroundFragmentShader, uniforms);
    background.filters = [backgroundShader];

    app.stage.addChild(background);
}

function init() {
    initDimensions();
    initUniforms();
    initApp();
    initBackground();

    app.ticker.add((delta) => {
        uniforms.u_time += delta;
        uniforms.u_mouse.copyFrom(app.renderer.plugins.interaction.mouse.global);
        });
}


PIXI.Loader.shared.add([
    SHADER
]).load(init)