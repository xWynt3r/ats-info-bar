Funbit.Ets.Telemetry.Dashboard.prototype.initialize = function (skinConfig, utils) {
    //
    // skinConfig - a copy of the skin configuration from config.json
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // this function is called before everything else, 
    // so you may perform any DOM or resource initializations / image preloading here

    utils.preloadImages([
        'images/bg-off.jpg', 'images/bg-on.jpg'
    ]);

    // return to menu by a click
    $(document).add('body').on('click', function () {
        window.history.back();
    });
}

Funbit.Ets.Telemetry.Dashboard.prototype.filter = function (data, utils) {
    //
    // data - telemetry data JSON object
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // This filter is used to change telemetry data 
    // before it is displayed on the dashboard.
    // You may convert km/h to mph, kilograms to tons, etc.

    data.hasJob = data.trailer.attached;

    // round truck speed
    data.truck.speedRounded = Math.abs(data.truck.speed > 0
        ? Math.floor(data.truck.speed)
        : Math.round(data.truck.speed));

    // other examples:

    // convert kilometers per hour to miles per hour
    data.truck.speedMph = data.truck.speed * 0.621371;
    // convert kg to lbs
    data.trailer.mass = Math.round((data.trailer.mass * 2.205)) + ' lbs';
    // calculate miles to go
    data.navigation.milesToGo = data.navigation.estimatedDistance / 1609;
    data.navigation.preEta = data.truck.speedMph > 5 ? (data.navigation.milesToGo / data.truck.speedMph)/data.game.timeScale : '';
    data.navigation.etaHours = data.navigation.preEta == '' ? '--':Math.floor(data.navigation.preEta);
    data.navigation.etaMinutes = data.navigation.preEta == '' ? '--':Math.floor((data.navigation.preEta % 1) * 60);
    // calculate wear
    var wearSumPercent = data.truck.wearEngine * 100 * 0.369876379 +
        data.truck.wearTransmission * 100 * 0.125850054 +
        data.truck.wearCabin * 100 * 0.228602019 +
        data.truck.wearChassis * 100 * 0.217146156 +
        data.truck.wearWheels * 100 * 0.058525;
    wearSumPercent = Math.min(wearSumPercent, 100);
    data.truck.wearSum = Math.round(wearSumPercent) + '%';
    data.trailer.wear = Math.round(data.trailer.wear * 100) + '%';
    // return changed data to the core for rendering
    return data;
};

Funbit.Ets.Telemetry.Dashboard.prototype.render = function (data, utils) {
    //
    // data - same data object as in the filter function
    // utils - an object containing several utility functions (see skin tutorial for more information)
    //

    // we don't have anything custom to render in this skin,
    // but you may use jQuery here to update DOM or CSS
}