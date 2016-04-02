var model = {
    currentPizza: null,
    adminShow: false,
    pizzas: [{
        clickCount: 0,
        name: "Supreme",
        imgSrc: 'img/supreme.png'
    }, {
        clickCount: 0,
        name: "Hawaiian",
        imgSrc: 'img/hawaiian.png'
    }, {
        clickCount: 0,
        name: "Beef Deluxe",
        imgSrc: 'img/beef-deluxe.png'
    }]
};

var controller = {
    init: function() {
        // Set Current Pizza to first pizza in List
        model.currentPizza = model.pizzas[0];

        // Initialise Views
        pizzaListView.init();
        pizzaView.init();
        adminView.init();
        adminView.hide();
    },
    getCurrentPizza: function() {
        return model.currentPizza;
    },
    getPizzas: function() {
        return model.pizzas;
    },
    setCurrentPizza: function(pizza) {
        model.currentPizza = pizza;
    },
    incrementOrders: function() {
        model.currentPizza.clickCount++;
        pizzaView.render();
        adminView.render();
    },
    adminToggleDisplay: function() {
        if (model.adminShow == false) {
            this.adminShow();
        } else if (model.adminShow == true) {
            this.adminHide();
        }
    },
    adminHide: function() {
        model.adminShow = false;
        adminView.hide();
    },
    adminShow: function() {
        model.adminShow = true;
        adminView.show();
    },
    adminSave: function() {
        model.currentPizza.name = adminView.adminPizzaName.value;
        model.currentPizza.imgSrc = adminView.adminImageSrc.value;
        model.currentPizza.clickCount = adminView.adminPizzaCount.value;
        pizzaView.render();
        pizzaListView.render();
        controller.adminHide();
    }
};


var pizzaView = {
    init: function() {
        this.pizzaElem = document.getElementById('pizza');
        this.pizzaNameElem = document.getElementById('pizza-name');
        this.pizzaCountElem = document.getElementById('pizza-order');
        this.pizzaImageElem = document.getElementById('pizza-img');

        // On Click increment Current Pizza's order
        this.pizzaImageElem.addEventListener('click', function() {
            controller.incrementOrders();
        })

        // render this view (Update the DOM with the right values)
        this.render();
    },
    render: function() {
        // Update the DOM with values from current Pizza
        var currentPizza = controller.getCurrentPizza();
        this.pizzaNameElem.textContent = currentPizza.name;
        this.pizzaCountElem.textContent = currentPizza.clickCount;
        this.pizzaImageElem.src = currentPizza.imgSrc;
    }
};
var pizzaListView = {
    init: function() {
        // Store the DOM element for easy access later
        this.pizzaListElem = document.getElementById("pizza-list");

        // Get the Pizzas from controller
        var pizzas = controller.getPizzas();

        // Empty the Pizza List
        this.pizzaListElem.innerHTML = '';

        // Loop Over the Pizzas
        for (i = 0; i < pizzas.length; i++) {
            // this is the pizza we're currently looping over
            pizza = pizzas[i];

            // Make a new List Item and set its Text
            anchor = document.createElement('a');
            anchor.textContent = pizza.name;

            li = document.createElement('li');
            li.appendChild(anchor);

            // On Click set the current Pizza and render Pizza View
            anchor.addEventListener('click', (function(pizzaCopy) {
                return function() {
                    controller.setCurrentPizza(pizzaCopy);
                    pizzaView.render();
                    adminView.render();
                    controller.adminHide();
                }
            })(pizza));

            // Add the Element to the List
            this.pizzaListElem.appendChild(li);
        }
    },
    render: function() {
        // Store the DOM element for easy access later
        this.pizzaListElem = document.getElementById("pizza-list");

        // Get the Pizzas from controller
        var pizzas = controller.getPizzas();

        // Empty the Pizza List
        this.pizzaListElem.innerHTML = '';

        // Loop Over the Pizzas
        for (i = 0; i < pizzas.length; i++) {
            // this is the pizza we're currently looping over
            pizza = pizzas[i];

            // Make a new List Item and set its Text
            elem = document.createElement('li');
            elem.textContent = pizza.name;

            // On Click set the current Pizza and render Pizza View
            elem.addEventListener('click', (function(pizzaCopy) {
                return function() {
                    controller.setCurrentPizza(pizzaCopy);
                    pizzaView.render();
                    adminView.render();
                }
            })(pizza));

            // Add the Element to the List
            this.pizzaListElem.appendChild(elem)
        }
    }
};
var adminView = {
    init: function() {
        this.adminPizzaName = document.getElementById('pizza-name-input');
        this.adminPizzaCount = document.getElementById('pizza-order-input');
        this.adminImageSrc = document.getElementById('pizza-imgsrc-input');

        this.admin = document.getElementById('admin');

        this.adminBtn = document.getElementById("admin-button");
        this.adminSaveBtn = document.getElementById('save-button');
        this.adminCancelBtn = document.getElementById('cancel-button');

        this.adminBtn.addEventListener('click', function() {
            controller.adminToggleDisplay();
        });

        this.adminCancelBtn.addEventListener('click', function() {
            controller.adminHide();
        });

        this.adminSaveBtn.addEventListener('click', function() {
            controller.adminSave();
        });


        this.render();
    },
    render: function() {
        var currentPizza = controller.getCurrentPizza();
        this.adminPizzaName.value = currentPizza.name;
        this.adminPizzaCount.value = currentPizza.clickCount;
        this.adminImageSrc.value = currentPizza.imgSrc;
    },
    show: function() {
        this.admin.style.display = 'block';
    },
    hide: function() {
        this.admin.style.display = 'none';
    }
};

controller.init();
