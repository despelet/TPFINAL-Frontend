const { createApp } = Vue
    createApp({
        data() {
            return {
                productos: [],
                //url:'http://127.0.0.1:5000/productos', // si el backend esta corriendo local usar localhost 5000
                url:'https://despelett.pythonanywhere.com/productos', // si ya lo subieron a pythonanywhere
                error: false,
                cargando: true,
                /*atributos para el guardar los valores del formulario */
                id:0,
                tipo_producto:"",
                modelo:"",
                descripcion:"",
                proveedor:"",
                precio:0,
                imagen:""
            }
            },
            methods: {
                fetchData(url) {
                    fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.productos = data;
                        this.cargando = false
                    })
                    .catch(err => {
                        console.error(err);
                        this.error = true
                    })
            },
            eliminar(producto) {
                const url = this.url + '/' + producto;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                .then(res => res.json()) // or res.json()
                .then(res => {
                    location.reload();
                })
            },
            grabar() {
                let producto = {
                    tipo_producto: this.tipo_producto,
                    modelo: this.modelo,
                    descripcion: this.descripcion,
                    proveedor: this.proveedor,
                    precio: this.precio,
                    imagen: this.imagen
                }
                var options = {
                body: JSON.stringify(producto),
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow'
                }
                fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "../pages/productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")
                })
            }
        },
        created() {
            this.fetchData(this.url)
        },
    }).mount('#app')