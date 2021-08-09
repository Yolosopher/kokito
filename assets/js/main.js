const lis = [...document.querySelectorAll('.homemain__list__li')]

let mainslider
let thumbslider

let body = document.querySelector('body')

// modal toggler
const modalToggler = (on = true) => {
	let productmodal = document.querySelector('.productmodal')
	let productmodal__bg = document.querySelector('.productmodal__bg')
	if (!!productmodal) {
		if (on) {
            body.classList.add('noscroll')
			productmodal.classList.add('toggled')
			productmodal__bg.classList.add('toggled')
		} else {
            productmodal.classList.remove('toggled')
			productmodal__bg.classList.remove('toggled')
            body.classList.remove('noscroll')
		}
	}
}

const productmodal__content = document.querySelector('.productmodal__content')
lis.forEach((li) => {
	li.addEventListener('click', () => {
		if (!!document.querySelector('.swiper-slide-active')) {
			mainslider.destroy()
			thumbslider.destroy()
		}
		productmodal__content.innerHTML = `
            <div class="productmodal__X"></div>
            <div class="productmodal__mainslider swiper-container">
                <div class="productmodal__wrapper swiper-wrapper"></div>
            </div>
            <div class="productmodal__thumbslider swiper-container">
                <div class="productmodal__wrapper swiper-wrapper"></div>
            </div>
            <div class="productmodal__description"></div>
        `
		let thumbWrapper = productmodal__content.querySelector(
			'.productmodal__thumbslider .productmodal__wrapper'
		)
		let mainWrapper = productmodal__content.querySelector(
			'.productmodal__mainslider .productmodal__wrapper'
		)
		let description = productmodal__content.querySelector(
			'.productmodal__description'
		)
		let modalX = productmodal__content.querySelector('.productmodal__X')

		modalX.addEventListener('click', () => {
			modalToggler(false)
		})

		description.innerHTML = `<p>${li.dataset.description}</p>`

		let images = []

		;[...li.querySelectorAll('img')].forEach((limg) => {
			images.push(limg.src)
		})

		images.forEach((image) => {
			let newSlide1 = document.createElement('div')
			let newSlide2 = document.createElement('div')
			newSlide1.className = 'productmodal__slide swiper-slide'
			newSlide1.innerHTML = `<img src="${image}" alt="" />`
			newSlide2.className = 'productmodal__slide swiper-slide'
			newSlide2.innerHTML = `<img src="${image}" alt="" />`
			mainWrapper.appendChild(newSlide1)
			thumbWrapper.appendChild(newSlide2)
		})
		modalToggler()
		thumbslider = new Swiper('.productmodal__thumbslider', {
			slidesPerView: 4,
			spaceBetween: 10,
		})
		mainslider = new Swiper('.productmodal__mainslider', {
			slidesPerView: 1,
			spaceBetween: 10,
			thumbs: {
				swiper: thumbslider,
			},
		})
	})
})
