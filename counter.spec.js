import { shallowMount } from '@vue/test-utils'
import Counter from '../../../src/components/Counter.vue'



describe('Counter', () =>{

    /*test('debe hacer match con el snapshot',()=>{

        const wrapper = shallowMount(Counter)

        //fotografía del componente original -> ALGO

        expect(wrapper.html()).toMatchSnapshot()

    })*/
    
    //let wrapper = shallowMount(Counter); no hacer!!
    let wrapper
    beforeEach(() =>{
        wrapper=shallowMount(Counter)
    })
    test('H2 label debe tener el valor por default "Counter"', () =>{

        //Si declaramos en cada función la siguiente línea, por el scope, se sobreescribe en cada función
        //const wrapper = shallowMount(Counter)
        //El parámetro del find (primero que encuentre) seleccionará la etiqueta correspondiente
        expect(wrapper.find('h2').exists()).toBeTruthy()
        const h2 = wrapper.find('h2')
        console.log(h2.text())
        expect(h2.text()).toBe('Counter')
    
    })

    //test unitarios con find y findAll
    test('el valor por defecto debe ser 100 en el párrafo', async() => {
        //const wrapper = shallowMount(Counter)
        const p = wrapper.find('p')
        let pTags = wrapper.findAll('p')
        let value = wrapper.find('[data-testid="counter"]').text()
        
        //expect(p.text()).toBe('100') //mal -> "100 ^2=10000"
        //expect(pTags[1].text()).toBe('100') //bien "100"
        expect(value).toBe('100')
        
        /* Si declaramos al principio de la función sólo "const wrapper = shallowMount(Counter)", debido a que el dom
    se manipula, el valor esperado ya no será igual debido a que se persiste en memoria, para corregir eso debemos usar el beforEach
    y asegurarnos de que cada que se inicia una prueba, la variable toma su valor inicial. El siguiente snipet altera el dom al desestructurar y 
    altera el resultado de las pruebas
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')
        await increaseBtn.trigger('click')*/
    })

    //Test para simular eventos -> click de botones:
    test('debe de incrementar y decrementar el counter', async() => {
        //const wrapper = shallowMount(Counter)
        const increaseBtn = wrapper.find('button')
        
        //simular el click
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        //let value = wrapper.find('[data-testid="counter"]').text()
        
        //Después de presionar dos veces el botón -  :        
        //const decreaseBtn = wrapper.findAll('button')[1]   = segundo botón del arreglo All de arriba para abajo en counter.vue
        let decreaseBtn = wrapper.findAll('button')
        await decreaseBtn[1].trigger('click')
        await decreaseBtn[1].trigger('click')

        //volvemos a cargar el valor de value
        let value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe('101')

    })

    //lo mismo pero desestructurado:
    test('debe de incrementar y decrementar el counter', async() => {
        //const wrapper = shallowMount(Counter)
        const [increaseBtn, decreaseBtn] = wrapper.findAll('button')

        //simular los click:
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')
        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const value = wrapper.find('[data-testid="counter"]').text()
        expect(value).toBe('101')
    })

    test('debe de establecer el valor por defecto', () =>{
        //console.log(wrapper.props())   imprime el valor de starts y title
        const {start} = wrapper.props(); console.log(start)
        //const go = wrapper.props('start'); console.log(go)
        const value = wrapper.find('[data-testid="counter"]').text()
        expect(Number(value)).toBe(start)
    })

    test('Debe de mostrar la prop title', () => {
        const wrapper = shallowMount(Counter, {
            props:{
                title: 'Hola Mundo',
                //start:'5' -> warning del tipo type check
            }
        })
        //console.log(wrapper.html())
        expect(wrapper.find('h2').text()).toBe(title)
        
    })
})
