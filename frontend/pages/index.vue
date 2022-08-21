<template>
  <div>
    <h1>Hola</h1>
    <v-row justify="space-around">
        <template v-for="(item) in list">
          <v-card width="250">
            <v-card-text>Nombre: {{item.name}}</v-card-text>
            <v-card-text>ID: {{item.id}}</v-card-text>
            <v-card-text>Edad: {{item.age}}</v-card-text>
            <v-card-text>Dirección: {{item.address}}</v-card-text>
            <v-card-text>{{item.photo_url}}</v-card-text>
            <v-btn>Editar</v-btn>
            <v-btn>Borrar</v-btn>
          </v-card>
        </template>
    </v-row>
    <v-btn>Crear</v-btn>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return{
      list:[]
    }
  },
  beforeMount(){
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      let url = 'http://localhost:3001/';
      let payload = {};
      //console.log('esta es la url'+url);
      console.log('funciona');
      //console.log(this.$axios);
       let response = await this.$axios.get(url);
       //console.log(response);
       let data = response.data.data;
      // console.log('funciona x2');
       console.log(data);

      for(let i=0;i<data.length;i++){
        this.list.push(data[i]);
      }

    }
  }
}
</script>
