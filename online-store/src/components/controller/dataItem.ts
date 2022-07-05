class DataItem {
  name: string
	constructor() {
    this.name = 'name'
	}

	loadData(name: string){
    this.name = name
    return Promise.resolve(this.name)
    // return fetch('assets/json/pets.json')
		// 				.then(res => res.json())
    //         .then(data => data.find(pet => pet.name === this.name))
	}
}

export default DataItem