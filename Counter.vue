<template>
    <h2>{{ customTitle}}</h2>
    <p>{{counter}} <sup>2</sup>={{squareCounter}} </p>
    <p data-testid="counter">{{counter}}</p>
    <div>
        <button v-on:click="increase">+1</button>
        <button @click="decrease">-1</button>
    </div>
</template>

<script>
export default{
    props:{
        title: String, 
        start: {
            type: Number,
            default:100,
            //required: true
            validator(value){
                return value >=0
            }
        }
    },
    data(){        //Reactivo -> vue puede crear escuchadores u observadores, vue está al pendiente de los cambios
        return{
            counter:this.start
        }
    },
    methods:{
        getSquareValue(){
            return this.counter*this.counter
        },
        increase(){
            this.counter++
        },
        decrease(){
            this.counter--
        }
    },
    computed:{
        squareCounter(){
            return this.counter * this.counter
        },
        customTitle(){
            return this.title || 'Counter'
        }
    }
}
</script>

<style>

</style>