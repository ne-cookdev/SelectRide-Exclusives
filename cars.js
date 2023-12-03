"use strict"
let all_cars = [];

function makeCard(cars) {
    let c_s = $('#cards_section-id');
    c_s.empty();
    for (let car of cars) {
        let c_sCard = $('<div></div>').addClass("cards_section-card");
        let c_sCardPhoto = $('<img>').addClass("cards_section-card--photo").attr({
            "src": `images/${car.photo}`,
            "alt": `${car.name}`
        });
        let c_sCardBody = $('<div></div>').addClass("cards_section-card--body");
        let c_sCardBodyH4 = $(`<h4>${car.name}</h4>`);
        let c_sCardBodySpan = $(`<span>${car.year}</span>`);
        let c_sCardBodyInfo = $('<div></div>').addClass("cards_section-card--body---info");
        let c_sCardBodyAvailability = $('<div></div>').addClass("cards_section-card--body---availability");
        let c_sCardBodyAvailabilityIndicator = $('<div></div>').addClass("cards_section-card--body---availability----indicator");
        let c_sCardBodyAvailabilitySpan = $('<span>В наличии</span>');
        let c_sCardBodyPrice = $('<div></div>').addClass("cards_section-card--body---price");
        let c_sCardBodyPriceP = $(`<p>${car.price} ₽</p>`);
        let c_sCardBodyPriceSpan = $(`<span>${car.old_price} ₽</span>`);
        let c_sCardBodyGeo = $('<div></div>').addClass("cards_section-card--body---geo");
        let c_sCardBodyGeoSvg = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#aaa" width="1em" height="1em" style="display: inline-block; flex-shrink: 0; font-size: 1em; line-height: 1em;"></svg>');
        let c_sCardBodyGeoSpan = $(`<span>${car.place}</span>`);


        c_sCard.append(c_sCardPhoto);
        c_sCard.append(c_sCardBody);
        c_sCardBody.append(c_sCardBodyH4);
        c_sCardBody.append(c_sCardBodySpan);

        for (let info in car.specs) {
            let c_sCardBodyInfoDivSvg = $('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#aaa" width="1em" height="1em" style="display: inline-block; flex-shrink: 0; font-size: 1em; line-height: 1em;"></svg>');
            let c_sCardBodyInfoDiv = $('<div></div>');
            c_sCardBodyInfoDiv.append(c_sCardBodyInfoDivSvg)
            c_sCardBodyInfoDivSvg.append($(`#icone_${Object.keys(car.specs).indexOf(info)}`).clone());
            c_sCardBodyInfoDiv.append($(`<p>${car.specs[info]}</p>`))
            c_sCardBodyInfo.append(c_sCardBodyInfoDiv);
            c_sCardBody.append(c_sCardBodyInfo);
        }

        c_sCardBody.append(c_sCardBodyAvailability);
        c_sCardBodyAvailability.append(c_sCardBodyAvailabilityIndicator);
        c_sCardBodyAvailability.append(c_sCardBodyAvailabilitySpan);
        c_sCardBody.append(c_sCardBodyPrice);
        c_sCardBodyPrice.append(c_sCardBodyPriceP);
        c_sCardBodyPrice.append(c_sCardBodyPriceSpan);
        c_sCardBody.append(c_sCardBodyGeo);
        c_sCardBodyGeo.append(c_sCardBodyGeoSvg);
        c_sCardBodyGeoSvg.append($('#icon_geo').clone());
        c_sCardBodyGeo.append(c_sCardBodyGeoSpan);

        c_s.append(c_sCard);
    }
}

function filtration(filters) {
    let cars = [];
    let filter_consFrom = parseInt(filters.consumption_from) || 0;
    let filter_consTo = parseInt(filters.consumption_to) || Infinity;
    let filter_priceFrom = parseInt(filters.price_from) || 0;
    let filter_priceTo = parseInt(filters.price_to) || Infinity;

    for (let car of all_cars) {
        let car_name = car.name.split(' ')[0].toLowerCase().trim();
        let car_engine = car.specs.engine.split(' ').at(-1).toLowerCase().trim();
        let car_transmisson = car.specs.transmission.toLowerCase().trim();
        let car_odo = car.specs.odo.split(' ').at(-1).toLowerCase().trim();
        let car_cons = parseInt(car.specs.fuel.split(' ')[0].trim());
        let car_price = parseInt(car.price.split(' ').join('').trim());

        if (car_name in filters && car_engine in filters && car_transmisson in filters && car_odo in filters) {
            if ((filter_consFrom <= car_cons && car_cons <= filter_consTo) && (filter_priceFrom <= car_price && car_price <= filter_priceTo)) {
                cars.push(car);
            }
        }
    }
    makeCard(cars);
}

$.getJSON("cars_to_sell.json", function (data) {
        all_cars = data;
        $('#filters_form').submit();
    })
    .done(function (data) {
        console.log("Cars successfully loaded")
    })
    .fail(function (er, st, et) {
        console.log("Cars loading error");
        console.log(et);
    });

$('#filters_form').submit(function () {
    let filters = {};

    $.each($(this).serializeArray(), function (i, field) {
        filters[field.name] = field.value;
    })

    filtration(filters);
    return false;
})
