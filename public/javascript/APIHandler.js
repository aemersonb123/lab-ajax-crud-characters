class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  async getFullList() {
    const characters = await axios.get(this.BASE_URL + "/characters");
    return characters.data;
  }

  async getOneRegister(id) {
    const character = await axios.get(this.BASE_URL + "/characters/" + id);
    return character.data;
  }

 async createOneRegister(character) {

  let response;
try {
  response = await axios.post(this.BASE_URL + '/characters/', character);

}  catch {

}   return response?.status;
  }

 async updateOneRegister(id, character) {
let response;
try {
  response = await axios.put(this.BASE_URL + '/characters/' + id, character);
}
catch {

}
return response?.status;
 }

  async deleteOneRegister(id) {
    await axios.delete(this.BASE_URL + "/characters/" + id);
  }
}
