let colores = ['red', 'pink', 'orange', 'blue', 'green', 'yellow', 'purple', 'brown', 'white', 'grey', 'black']

class Juego{
	#nivel = null
	constructor(tablero){
		this.nivel = 3
		this.tablero = tablero 
		this.crearTablero()
	}
	crearTablero(){
		let tarjetas = []
		let numTarjetas = 6 + this.nivel * 2
		let numCols = Math.round(Math.sqrt(numTarjetas * 3/2 ))
		this.tablero.style.gridTemplateColumns = `repeat(${numCols}, auto)`

		let coloresAleatorios = colores.toSorted( (a, b) => {return Math.random() - 0.5} )

		while(this.tablero.firstElementChild)
			this.tablero.firstElementChild.remove()

		for (let i = 0; i < numTarjetas; i += 2){
			let div = document.createElement('div')
			div.color = coloresAleatorios[i]
			//div.classList.add('oculto')
			console.log(div.color)
			div.style.backgroundColor = div.color
			tarjetas.push(div)
			tarjetas.push(div.cloneNode())
		}
		tarjetas.sort( (a, b) => {return Math.random() - 0.5} )
		tarjetas.forEach( tarjeta => {tablero.appendChild(tarjeta)})

	}
}

window.onload = () => {
	new Juego(document.getElementById('tablero'))
}
