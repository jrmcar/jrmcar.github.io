/* ***** Get Menu items ***** */

var app = new Vue({
    el: '#app',
    mounted() {
        let vm = this
        axios
            .get(
                'https://sheets.googleapis.com/v4/spreadsheets/1seMTbN55c0nAL8uvrwkrTcTgHTWvxwYKTr7rv2AyiB8/values/Specials!A2:C20?key=AIzaSyBUWEv91dPRNzP9NlBEzP1kA9EmsG0-7s0'
                // 'https://sheets.googleapis.com/v4/spreadsheets/1zIVCVA0Tk5CvAiTyeAdDBPygT3aKDiSeM2FbPU0JO2c/values/Specials!A2:C20?key=AIzaSyBhiqVypmyLHYPmqZYtvdSvxEopcLZBdYU'
            )
            .then(function (response) {
                let specials = response.data.values
                for (let index = 0; index < specials.length; index++) {
                    const element = specials[index]
                    let mitem = {
                        name: element[0],
                        description: element[1],
                        price: element[2]
                    }
                    if (vm.isEven(index)) {
                        vm.menuItems_L = vm.menuItems_L.concat(mitem)
                    } else {
                        vm.menuItems_R = vm.menuItems_R.concat(mitem)
                    }
                }
                // console.log(response)
            })
    },
    data: {
        menuItems_L: [],
        menuItems_R: [],
        menuStyle: {
            background: '#BA1B3B',
            color: '#FFFFFF'
        },
        dotStyle: {
            backgroundImage: 'radial-gradient(' + this.color + ' 1px, transparent 0px)'
        },
        titleStyle: {
            background: '#BA1B3B',
            color: '#f5b824',
            padding: '1px'
        }
    },
    computed: {},
    methods: {
        isEven: function (n) {
            return n % 2 == 0
        }
    }
});

/* Navbar scroll */
$(function () {
    var nav = $('.navbar'),
        doc = $(document),
        win = $(window);
    win.scroll(function () {
        if (doc.scrollTop() > 80) {
            nav.addClass('scrolled');
        } else {
            nav.removeClass('scrolled');
        }
    });
    win.scroll();
});

/* ***** Slideanim  ***** */
$(window).scroll(function () {
    $(".slideanim").each(function () {
        var pos = $(this).offset().top;
        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
            $(this).addClass("slide");
        }
    });
});

/* ***** Smooth Scrolling  ***** */
$(document).ready(function () {
    $(".navbar a, #service a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 900, function () {
                window.location.hash = hash;
            });
        }
    });

    /* ***** Scroll to Top ***** */
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 300) {
            $('.to-top').fadeIn(200);
        } else {
            $('.to-top').fadeOut(200);
        }
    });
    $('.to-top').click(function () {
        $('.body,html').animate({
            scrollTop: 0
        }, 500);
    });

})