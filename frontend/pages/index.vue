<template>
  <v-container>
    <h1 class="text-center mb-5">Usuarios</h1>
    <v-row justify="space-around">
        <template v-for="(item) in list">
          <v-card width="250" class="ma-3">
            <v-card-text class="text-card">Nombre: {{item.name}}</v-card-text>
            <v-card-text class="text-card">Identicicación: {{item.id}}</v-card-text>
            <v-card-text class="text-card">Edad: {{item.age}}</v-card-text>
            <v-card-text class="text-card">Dirección: {{item.address}}</v-card-text>
            <v-img :src="`http://localhost:3001/${item.photo_url}`" class="img-card"></v-img>
            <v-container >
              <v-row class="pa-3" justify="space-around">
                <v-btn @click="showM=!showM;showU=!showU;
                name=item.name;age=item.age;address=item.address;id=item.id" color="warning">Editar</v-btn>
              <v-btn @click="deleteUser(item.id)" color="error">Borrar</v-btn>
              </v-row>
            </v-container>
          </v-card>
        </template>
    </v-row>

    <v-row justify="center"  class="mt-6">
      <v-btn color="accent" @click="showM=!showM;clean()">Crear</v-btn>
    </v-row>

      <div v-show="showM"  class="modal">
        <v-form  ref="formUser" class="modal-content">
          <v-text-field
          ref="name"
          v-model="name"
          label="Nombre"
          :rules="[() => !!name || 'Es necesario rellenar el campo']"
          placeholder="Nombre"
          required>
          </v-text-field>
          <v-text-field
            v-if="!showU"
            ref="id"
            v-model="id"
            label="Identicicación"
            :rules="[() => !!name || 'Es necesario rellenar el campo']"
            placeholder="Identificación"
            required>
          </v-text-field>
          <v-text-field 
          v-model="age"
          ref="age"
          label="Edad"
          :rules="[() => !!age || 'Es necesario rellenar el campo']"
          placeholder="Edad"
          required>
          </v-text-field>
          <v-text-field 
          v-model="address"
          ref="address"
          label="Dirección"
          :rules="[() => !!name || 'Es necesario rellenar el campo']"
          placeholder="Dirección"
          required>
          </v-text-field>
          <v-file-input
            v-model="photo"
            ref="photo"
            :rules="[() => !!photo || 'Es necesario rellenar el campo']"
            accept="image/png, image/jpeg, image/bmp, image/jpg"
            placeholder="Seleccionar Foto"
            prepend-icon="mdi-camera"
            label="Foto"
          ></v-file-input>
          <v-container>
            <v-btn color="primary" @click="createUser()" v-if="!showU">Crear Usuario</v-btn>
            <v-btn color="warning" @click="updateUser()" v-if="showU">Actualizar Usuario</v-btn>
            <v-btn class="mx-3" color="info" @click="home()">Inicio</v-btn>
          </v-container>
        </v-form>
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return{
      list:[],
      id: null,
      name: null,
      age: null,
      address: null,
      photo: null,
      photo_url: null,
      showM: false,
      showU: false
    }
  },
  beforeMount(){
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      let url = 'http://localhost:3001/';
      let response = await this.$axios.get(url);
      let data = response.data.data;

      for(let i=0;i<data.length;i++){
        this.list.push(data[i]);
      }
    },
    async createUser() {
      try{
        if(!this.validateFields()){
          alert("Debe rellenar los campos indicados")
          return;
        }
        let url = 'http://localhost:3001/';
        const fd = new FormData();
        fd.append('file',this.photo, `${this.id}-${this.name}.${this.photo.name.split('.').pop()}`)
        let response2 = await this.$axios.post(url+'photo',fd)
        console.log(response2);
        let payload = {};
        payload.id = this.id;
        payload.name = this.name;
        payload.age = this.age;
        payload.address = this.address;
        payload.photo_url = `${this.id}-${this.name}.${this.photo.name.split('.').pop()}`;
        let response = await this.$axios.post(url, payload);
        console.log(response.data);
        this.showM = !this.showM;
        this.list = [];
        this.loadUsers();
        this.clean();
      }catch(e){
        console.log(e);
        alert("Error al rellenar los campos.")
      }
    },
    async updateUser() {
      try{
        if(!this.validateFields()){
          alert("Debe rellenar los campos indicados")
          return;
        }
        let url = 'http://localhost:3001/';
        const fd = new FormData();
        fd.append('file',this.photo, `${this.id}-${this.name}.${this.photo.name.split('.').pop()}`)
        let response2 = await this.$axios.post(url+'photo',fd)
        console.log(response2);
        let payload = {};
        payload.name = this.name;
        payload.age = this.age;
        payload.address = this.address;
        payload.photo_url = `${this.id}-${this.name}.${this.photo.name.split('.').pop()}`;
        let response = await this.$axios.put(url+this.id, payload);
        console.log(response.data);
        this.showM = !this.showM;
        this.showU = !this.showU;
        this.list = [];
        this.loadUsers();
        this.clean();
      }catch(e){
        console.log(e);
      }
      
    },
    async deleteUser(id) {
      let url = 'http://localhost:3001/';
      let response = await this.$axios.delete(url+id)
      console.log(response);
      this.list = [];
      this.loadUsers();
    },
    validateFields() {
      if(this.showM){
        if(this.id && this.age && this.name && this.address && this.photo){
          return true;
        }else{
          return false;
        }
      }else if(this.showU){
        if(this.age && this.name && this.address && this.photo){
          return true;
        }else{
          return false;
        }
      }
    },
    home() {
      this.showM = false;
      this.showU = false;
    },
    clean() {
      this.$refs.formUser.reset();
    }
  }
}
</script>
<style scoped>
.modal{
    position: fixed; 
    z-index: 1;
    padding-top: 100px; 
    left: 0;
    top: 0;
    width: 100%;
    height: 100%; 
    overflow: auto;
     background-color: rgb(255,255,255);
}

.modal-content {
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 75%;
    border-radius: 15px;
  }

  .text-card{
    color: rgb(0, 0, 90) !important;
    font-size: 1rem;
    padding: 8px 16px;
  }
  
  .img-card{
    max-height: 200px;
  }
</style>