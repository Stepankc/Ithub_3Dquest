import * as THREE from "three";
import * as CANNON from "cannon";
import Controls from "../World/Controls";
class PointerLockControlsCannon extends THREE.EventDispatcher {
  constructor(camera, cannonBody) {
    super();
    this.enabled = false;
    this.controls = new Controls()
    this.cannonBody = cannonBody;

    // var eyeYPos = 2 // eyes are 2 meters above the ground
    this.velocityFactor = 0.2;
    this.jumpVelocity = 20;

    this.pitchObject = new THREE.Object3D();
    this.pitchObject.add(camera);

    this.yawObject = new THREE.Object3D();
    this.yawObject.position.y = 2;
    this.yawObject.add(this.pitchObject);

    this.quaternion = new THREE.Quaternion();

    const contactNormal = new CANNON.Vec3(); // Normal in the contact, pointing *out* of whatever the player touched
    this.cannonBody.addEventListener("collide", (event) => {
      const { contact } = event;

      // contact.bi and contact.bj are the colliding bodies, and contact.ni is the collision normal.
      // We do not yet know which one is which! Let's check.
      if (contact.bi.id === this.cannonBody.id) {
        // bi is the player body, flip the contact normal
        contact.ni.negate(contactNormal);
      } else {
        // bi is something else. Keep the normal as it is
        contactNormal.copy(contact.ni);
      }
    });

    this.velocity = this.cannonBody.velocity;

    // Moves the camera to the cannon.js object position and adds velocity to the object if the run key is down
    this.inputVelocity = new THREE.Vector3();
    this.euler = new THREE.Euler();

    this.lockEvent = { type: "lock" };
    this.unlockEvent = { type: "unlock" };

    this.connect();
  }

  connect() {
    document.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("pointerlockchange", this.onPointerlockChange);
    document.addEventListener("pointerlockerror", this.onPointerlockError);
    document.addEventListener("keydown", this.controls.keyboard.events.keyDown);
    document.addEventListener("keyup", this.controls.keyboard.events.keyUp);
  }

  disconnect() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("pointerlockchange", this.onPointerlockChange);
    document.removeEventListener("pointerlockerror", this.onPointerlockError);
    document.removeEventListener(
      "keydown",
      this.controls.keyboard.events.keyDown
    );
    document.removeEventListener("keyup", this.controls.keyboard.events.keyUp);
  }

  dispose() {
    this.disconnect();
  }

  lock() {
    document.body.requestPointerLock();
  }

  unlock() {
    document.exitPointerLock();
  }

  onPointerlockChange = () => {
    if (document.pointerLockElement) {
      this.dispatchEvent(this.lockEvent);

      this.isLocked = true;
    } else {
      this.dispatchEvent(this.unlockEvent);

      this.isLocked = false;
    }
  };

  onPointerlockError = () => {
    console.error("PointerLockControlsCannon: Unable to use Pointer Lock API");
  };

  onMouseMove = (event) => {
    if (!this.enabled) {
      return;
    }

    const { movementX, movementY } = event;

    this.yawObject.rotation.y -= movementX * 0.002;
    this.pitchObject.rotation.x -= movementY * 0.002;

    this.pitchObject.rotation.x = Math.max(
      -Math.PI / 2,
      Math.min(Math.PI / 2, this.pitchObject.rotation.x)
    );
  };

  getObject() {
    return this.yawObject;
  }

  getDirection() {
    const vector = new CANNON.Vec3(0, 0, -1);
    vector.applyQuaternion(this.quaternion);
    return vector;
  }

  update(delta) {
    if (this.enabled === false) {
      return;
    }

    delta *= 10;
    delta *= 0.1;

    this.inputVelocity.set(0, 0, 0);

    if (this.controls.actions.up) {
      this.inputVelocity.z = -this.velocityFactor * delta;
    }
    if (this.controls.actions.down) {
      this.inputVelocity.z = this.velocityFactor * delta;
    }

    if (this.controls.actions.left) {
      this.inputVelocity.x = -this.velocityFactor * delta;
    }
    if (this.controls.actions.right) {
      this.inputVelocity.x = this.velocityFactor * delta;
    }

    // Convert velocity to world coordinates
    this.euler.x = this.pitchObject.rotation.x;
    this.euler.y = this.yawObject.rotation.y;
    this.euler.order = "XYZ";
    this.quaternion.setFromEuler(this.euler);
    this.inputVelocity.applyQuaternion(this.quaternion);

    // Add to the object
    this.velocity.x += this.inputVelocity.x;
    this.velocity.z += this.inputVelocity.z;
    this.yawObject.position.copy(this.cannonBody.position);
  }
}

export { PointerLockControlsCannon };
