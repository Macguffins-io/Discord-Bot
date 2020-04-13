/**
 * Responsible for creating the objectRequested if it exists in the objectPool
 */


class ObjectFactory{


	static createInstance(objectRequested,objectPool){

		let objectToCreate; 

		if (objectPool.hasOwnProperty(objectRequested) ){

			const objectClass = objectPool[objectRequested];

			objectToCreate = new objectClass();

		}else{
			throw new Error(`The Object(${objectRequested}) you tried to create was not found on the object pool`)
		}
		return objectToCreate;
	}
}
module.exports = ObjectFactory;
