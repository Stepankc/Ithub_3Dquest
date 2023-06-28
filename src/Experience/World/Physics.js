import * as CANNON from "cannon";
import * as THREE from "three";
import World from "./World";
import { PointerLockControlsCannon } from "../Utils/PointerLockControlsCannon.js";
import Experience from "../Experience";

export default class Physics {
  threeWorld = new World();
  experience = new Experience();
  time = this.threeWorld.time;
  controls = this.threeWorld.controls;
  debug = this.threeWorld.debug;
  delta = this.time.delta;
  container = this.experience.scene;
  startScreen = this.experience.startScreen;
  constructor(camera) {
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("physics");
    }
    //setup
    // Number of voxels
    this.nx = 50;
    this.ny = 8;
    this.nz = 50;

    // Scale of voxels
    this.sx = 0.5;
    this.sy = 0.5;
    this.sz = 0.5;

    this.instance = camera;
    this.setWorld();
    this.userSphere();
    this.setModels();
    this.setMaterials();
    this.ground();
    this.setPointerLockControls();
    this.test();

    this.time.on("tick", () => {
      this.world.step(1 / 60, this.time.delta, 3);
      if (this.sphere.userData.drag == "draggable") {
        this.sphere.position.copy(this.testSphereBody.position);
        this.testSphereBody.collisionResponse = true;
      } else if (this.sphere.userData.drag == "dragging") {
        this.testSphereBody.position.copy(this.sphere.position);
        this.testSphereBody.velocity.setZero();
        this.testSphereBody.initVelocity.setZero();
        this.testSphereBody.angularVelocity.setZero();
        this.testSphereBody.initAngularVelocity.setZero();
        this.testSphereBody.collisionResponse = false;
      }
    });
  }

  setWorld() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -3.25, 0);
    this.world.defaultContactMaterial.friction = 0;
    this.world.defaultContactMaterial.restitution = 0.2;

    if (this.debug.active) {
      this.debugFolder
        .add(this.world.gravity, "y")
        .step(0.001)
        .min(-20)
        .max(20)
        .name("gravity");
    }
  }

  setModels() {
    this.models = {};
    this.models.container = new THREE.Object3D();
    this.models.container.visible = true;
    this.models.materials = {};
    this.models.materials.static = new THREE.MeshBasicMaterial({
      color: 0x0000ff,
      wireframe: true,
    });
    this.models.materials.dynamic = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    this.models.materials.dynamicSleeping = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      wireframe: true,
    });

    if (this.debug.active) {
      this.debugFolder
        .add(this.models.container, "visible")
        .name("modelsVisible");
    }
  }

  setMaterials() {
    this.materials = {};

    // All materials
    this.materials.items = {};
    this.materials.items.floor = new CANNON.Material("floorMaterial");
    this.materials.items.dummy = new CANNON.Material("dummyMaterial");
    this.materials.items.wheel = new CANNON.Material("wheelMaterial");
    // Contact between materials
    this.materials.contacts = {};

    this.materials.contacts.floorDummy = new CANNON.ContactMaterial(
      this.materials.items.floor,
      this.materials.items.dummy,
      { friction: 0.05, restitution: 0.3, contactEquationStiffness: 1000 }
    );
    this.world.addContactMaterial(this.materials.contacts.floorDummy);

    this.materials.contacts.dummyDummy = new CANNON.ContactMaterial(
      this.materials.items.dummy,
      this.materials.items.dummy,
      { friction: 0.5, restitution: 0.3, contactEquationStiffness: 1000 }
    );
    this.world.addContactMaterial(this.materials.contacts.dummyDummy);

    this.materials.contacts.floorWheel = new CANNON.ContactMaterial(
      this.materials.items.floor,
      this.materials.items.wheel,
      { friction: 0.3, restitution: 0, contactEquationStiffness: 1000 }
    );
    this.world.addContactMaterial(this.materials.contacts.floorWheel);
  }

  userSphere() {
    this.radius = 1.3;
    this.sphereBody = new CANNON.Body({
      mass: 2,
      material: this.physicsMaterial,
      shape: new CANNON.Sphere(this.radius),
    });

    this.sphereBody.position.set(
      this.nx * this.sx * 0.5,
      this.ny * this.sy + this.radius * 2,
      this.nz * this.sz * 0.5
    );
    this.sphereBody.linearDamping = 0.9;
    this.world.addBody(this.sphereBody);
  }

  ground() {
    this.floor = {};
    this.floor.body = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: this.materials.items.floor,
    });

    this.floor.body.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.world.addBody(this.floor.body);
  }

  test() {
    this.sphereShape = new CANNON.Sphere(0.5);
    this.testSphereBody = new CANNON.Body({
      mass: 1,
      position: new CANNON.Vec3(0, 3, 0),
      shape: this.sphereShape,
    });
    this.world.addBody(this.testSphereBody);

    this.sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 32, 32),
      new THREE.MeshStandardMaterial({
        metalness: 0.3,
        roughness: 0.4,
      })
    );
    this.sphere.castShadow = true;
    this.sphere.position.y = 5;
    this.sphere.fixedRotation = true;
    this.container.add(this.sphere);
    this.sphere.userData.drag = "draggable";
  }

  addObject(_options) {
    const collision = {
      model: {
        meshes: [],
        container: new THREE.Object3D(),
      },
    };
    this.models.container.add(collision.model.container);

    collision.children = [];

    // Material
    const bodyMaterial = this.materials.items.dummy;

    // Body
    collision.body = new CANNON.Body({
      position: new CANNON.Vec3(
        _options.offset.x,
        _options.offset.y,
        _options.offset.z
      ),
      mass: _options.mass,
      material: bodyMaterial,
    });

    collision.body.allowSleep = true;
    collision.body.sleepSpeedLimit = 0.01;
    if (_options.sleep) {
      collision.body.sleep();
    }

    this.world.addBody(collision.body);

    // Rotation
    if (_options.rotation) {
      const rotationQuaternion = new CANNON.Quaternion();
      rotationQuaternion.setFromEuler(
        _options.rotation.x,
        _options.rotation.y,
        _options.rotation.z,
        _options.rotation.order
      );
      collision.body.quaternion =
        collision.body.quaternion.mult(rotationQuaternion);
    }

    // Center
    collision.center = new CANNON.Vec3(0, 0, 0);

    // Shapes
    const shapes = [];

    for (const mesh of _options.meshes) {
      let shape = null;

      if (mesh.name.match(/^cube_?[0-9]{0,3}?|box[0-9]{0,3}?$/i)) {
        shape = "box";
      } else if (mesh.name.match(/^center_?[0-9]{0,3}?$/i)) {
        shape = "center";
      }

      if (shape === "center") {
        collision.center.set(mesh.position.x, mesh.position.y, mesh.position.z);
      } else if (shape) {
        // Geometry
        let shapeGeometry = null;

        if (shape === "box") {
          const halfExtents = new CANNON.Vec3(
            mesh.scale.x * 0.5,
            mesh.scale.y * 0.5,
            mesh.scale.z * 0.5
          );
          shapeGeometry = new CANNON.Box(halfExtents);
        }

        // Position
        const shapePosition = new CANNON.Vec3(
          mesh.position.x,
          mesh.position.y,
          mesh.position.z
        );

        // Quaternion
        const shapeQuaternion = new CANNON.Quaternion(
          mesh.quaternion.x,
          mesh.quaternion.y,
          mesh.quaternion.z,
          mesh.quaternion.w
        );

        // Save
        shapes.push({ shapeGeometry, shapePosition, shapeQuaternion });
        // Create model object
        let modelGeometry = null;
        if (shape === "box") {
          modelGeometry = new THREE.BoxGeometry(1, 1, 1);
        }

        const modelMesh = new THREE.Mesh(
          modelGeometry,
          this.models.materials[_options.mass === 0 ? "static" : "dynamic"]
        );
        modelMesh.position.copy(mesh.position);
        modelMesh.scale.copy(mesh.scale);
        modelMesh.quaternion.copy(mesh.quaternion);

        collision.model.meshes.push(modelMesh);
      }
    }

    // Update meshes to match center
    for (const _mesh of collision.model.meshes) {
      _mesh.position.x -= collision.center.x;
      _mesh.position.y -= collision.center.y;
      _mesh.position.z -= collision.center.z;

      collision.model.container.add(_mesh);
    }

    // Update shapes to match center
    for (const _shape of shapes) {
      // Create physic object
      _shape.shapePosition.x -= collision.center.x;
      _shape.shapePosition.y -= collision.center.y;
      _shape.shapePosition.z -= collision.center.z;

      collision.body.addShape(
        _shape.shapeGeometry,
        _shape.shapePosition,
        _shape.shapeQuaternion
      );
    }

    // Update body to match center
    collision.body.position.x += collision.center.x;
    collision.body.position.y += collision.center.y;
    collision.body.position.z += collision.center.z;

    // Save origin
    collision.origin = {};
    collision.origin.position = collision.body.position.clone();
    collision.origin.quaternion = collision.body.quaternion.clone();
    collision.origin.sleep = _options.sleep;

    // Time tick update
    this.time.on("tick", () => {
      collision.model.container.position.set(
        collision.body.position.x,
        collision.body.position.y,
        collision.body.position.z
      );
      collision.model.container.quaternion.set(
        collision.body.quaternion.x,
        collision.body.quaternion.y,
        collision.body.quaternion.z,
        collision.body.quaternion.w
      );

      if (this.models.container.visible && _options.mass > 0) {
        for (const _mesh of collision.model.container.children) {
          _mesh.material =
            collision.body.sleepState === 2
              ? this.models.materials.dynamicSleeping
              : this.models.materials.dynamic;
        }
      }
    });

    // Reset
    collision.reset = () => {
      collision.body.position.copy(collision.origin.position);
      collision.body.quaternion.copy(collision.origin.quaternion);

      if (collision.origin.sleep) {
        collision.body.sleep();
      }
    };

    return collision;
  }

  setPointerLockControls() {
    this.firstConrol = new PointerLockControlsCannon(
      this.instance,
      this.sphereBody
    );

    this.container.add(this.firstConrol.getObject());

    this.startScreen.addEventListener("click", () => {
      this.firstConrol.lock();
    });

    this.firstConrol.addEventListener("lock", () => {
      this.firstConrol.enabled = true;
      this.startScreen.style.display = "none";
    });

    this.firstConrol.addEventListener("unlock", () => {
      this.firstConrol.enabled = false;
      this.startScreen.style.display = null;
    });
  }

  update() {
    this.firstConrol.update(this.delta, this.instance);
  }
}
