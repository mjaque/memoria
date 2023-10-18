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
			div.setAttribute('color', coloresAleatorios[i])
			div.classList.add('oculto')
			div.style.backgroundColor = div.color
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
	console.log(tarjeta)
		tarjeta.classList.remove('oculto')
		tarjeta.style.backgroundColor = tarjeta.getAttribute('color')
		if (!this.#primerTurno)
			this.#tarjetas.forEach( tarjeta => { tarjeta.classList.add('oculto') })
		this.#primerTurno = !this.#primerTurno
	}
}

window.onload = () => {
	new Juego(document.getElementById('tablero'))
}
