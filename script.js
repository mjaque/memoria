let colores = ['red', 'pink', 'orange', 'blue', 'green', 'yellow', 'purple', 'brown', 'white', 'grey', 'black']

class Juego{
	#nivel = null
	#tablero = null
	#tarjetas = null
	#primerTurno = null

	constructor(tablero){
		this.#nivel = 1
		this.#tablero = tablero 
		this.#primerTurno = true
		this.crearTablero()
	}
	crearTablero(){
		this.#tarjetas = []
		let numTarjetas = 6 + this.#nivel * 2
		let numCols = Math.round(Math.sqrt(numTarjetas * 3/2 ))
		this.#tablero.style.gridTemplateColumns = `repeat(${numCols}, auto)`

		let coloresAleatorios = colores.toSorted( (a, b) => {return Math.random() - 0.5} )

		while(this.#tablero.firstElementChild)
			this.#tablero.firstElementChild.remove()

		for (let i = 0; i < numTarjetas; i += 2){
			let div = document.createElement('div')
			div.classList.add('tarjeta')
			let color = coloresAleatorios[i]
			div.setAttribute('data-color', color)
			div.classList.add('oculto')
			div.style.backgroundColor = color
			this.#tarjetas.push(div)
			this.#tarjetas.push(div.cloneNode())
		}
		this.#tarjetas.sort( (a, b) => {return Math.random() - 0.5} )
		this.#tarjetas.forEach( tarjeta => {
			tarjeta.onclick = this.descubrir.bind(this)
			this.#tablero.appendChild(tarjeta)})

	}
	descubrir(evento){
		let tarjeta = evento.target
		tarjeta.classList.remove('oculto')
		tarjeta.style.backgroundColor = tarjeta.getAttribute('data-color')
		if (!this.#primerTurno)
			setTimeout(this.comprobar.bind(this), 1000)
		this.#primerTurno = !this.#primerTurno
	}
	comprobar(){
		let tarjetasDescubiertas = this.#tablero.querySelectorAll('.tarjeta:not([class="tarjeta oculto"])')
		if (tarjetasDescubiertas.item(0).getAttribute('data-color') === tarjetasDescubiertas.item(1).getAttribute('data-color')){
			tarjetasDescubiertas.forEach( tarjeta => {
				tarjeta.style.visibility = 'hidden'
				tarjeta.classList.add('oculto')
			})
			this.comprobarFinal()
		}
		else
			this.#tarjetas.forEach( tarjeta => { tarjeta.classList.add('oculto') })
	}
	comprobarFinal(){
		let tarjetasVisibles = 0
		this.#tablero.querySelectorAll('.tarjeta').forEach( tarjeta => {
			if (tarjeta.style.visibility !== 'hidden')
				tarjetasVisibles++
		})
		if (tarjetasVisibles === 0){
			this.#nivel++
			this.crearTablero()
		}
	}
}

window.onload = () => {
	new Juego(document.getElementById('tablero'))
}
