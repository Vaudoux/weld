
// Объявление переменных для сварного соединения
let connectionType;

const thicknessCount = document.getElementById('thicknessList');
let thickness = thicknessCount.value;

let gap;
let blunting;
let weldWidth;
let gainHeight;
let angleAlpha;
let weldWidthSecond;
let gainHeightSecond;
let radiusTransition;
let angleBetta;
let refractiveHeight;
let protrusionEnd;
let distanceBetweenEdgesCitcularSelection;
// Переменные для формул
let consumptionRate;
let consumptionRateMeter;
let consumptionRateSpecific;
let weldLength;
let weldLengthMeter;
let diameter;
let crossSectionalArea;
let massDepositedMetal;

let calculationError;
// Математические константы
const pi = 3.14;
const meter = 1000;
let position;
let nameWeldingMethod;
// Газ и флюс
let gasConsumptionRate;
let gasConsumptionRateMeter;
let gasConsumptionRateSpecific;
let mineTime;
let additionGasConsumption;
let fluxConsumptionRate;
// Константы для формул
let rotameterConsumption = 5;
let surfacingCoefficient = 15.1;
let weldingCurrent = 250;
let preparationTime = 0.05;
let radiusForSto = 5;
//-----------------------------------------------------
const specificDensityDirectedMetal = 0.00785;
const electrodeLossCoefficientMma = 1.7;
const wireLossCoefficientMag = 1.15;
const rodLossCoefficientTig = 1.1;
const wireLossCoefficientSaw = 1.02;

const mineButton = document.getElementById('mineButton');
mineButton.addEventListener('click', function() {
    ///Основные формулы рассчета Fn///
    //ГОСТ 16037
    if (
        ((typeOfConnection.value === "С2" || typeOfConnection.value === "С4" || typeOfConnection.value === "С5") && technicalDocumentation.value === 'ГОСТ 16037') 
        || 
        (typeOfConnection.value === "С1" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771'))
        || 
        ((typeOfConnection.value === "С5" || typeOfConnection.value === "С6" || typeOfConnection.value === "У1") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771'))) {
        //Fn = s * b + 0.75 * (e * g)
        crossSectionalArea = thickness * gap + 0.75 * (weldWidth * gainHeight);

    } else if (
        ((typeOfConnection.value === "С8" || typeOfConnection.value === "С10") && technicalDocumentation.value === 'ГОСТ 16037') 
        || 
        ((typeOfConnection.value === "С8" || typeOfConnection.value === "С10" || typeOfConnection.value === "У6" || typeOfConnection.value === "Т6") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771'))) {
        //Fn = s * b + 0.5 * ((s - c) * (s - c)) * Tan(a * pi / 180) + 0.75 * (e * g) 
        crossSectionalArea = thickness * gap + 0.5 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight);

    } else if (
        ((typeOfConnection.value === "С17" || typeOfConnection.value === "С18" || typeOfConnection.value === "С19") && technicalDocumentation.value === 'ГОСТ 16037') 
        || ((typeOfConnection.value === "С19") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771'))) {
        //Fn = s * b + (s - c) * (s - c) * Tan(a * pi / 180) + 0.75 * (e * g) 
        crossSectionalArea = thickness * gap + (thickness - blunting) * (thickness - blunting) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "С20" || typeOfConnection.value === "С21") && technicalDocumentation.value === 'ГОСТ 16037') {
        //Fn = s * b + ((s - c) * (s - c)) / 2 * Tan(a * pi / 180) + 0.75 * (e * g) 
        crossSectionalArea = thickness * gap + ((thickness - blunting) * (thickness - blunting)) / 2 * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight);
    
    } else if (typeOfConnection.value === "С28" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = (s + Rgib) * b + 0.43 * (s + Rgib) * (s + Rgib) + 0.75 * (e * g)
        crossSectionalArea = (thickness + radiusTransition) * gap + 0.43 * (thickness + radiusTransition) * (thickness + radiusTransition) + 0.75 * (weldWidth * gainHeight);
    
    } else if ((typeOfConnection.value === "С2" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) || (typeOfConnection.value === "С4" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771'))) {
        //Fn = s * b + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if (typeOfConnection.value === "С3" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.75 * e * (g + 2) - i взята как среднее значение - 2
        crossSectionalArea = thickness * gap + 0.75 * weldWidth * (gainHeight + 2);

    } else if (typeOfConnection.value === "С7" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + 1.5 * (weldWidth * gainHeight);

    } else if (typeOfConnection.value === "С42" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + (0.3925 * f) * (0.3925 * f) + f * (h - 0.5 * f) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + (0.3925 * distanceBetweenEdgesCitcularSelection) * (0.3925 * distanceBetweenEdgesCitcularSelection) + distanceBetweenEdgesCitcularSelection * (refractiveHeight - 0.5 * distanceBetweenEdgesCitcularSelection) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С9" || typeOfConnection.value === "С12") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * ((s - c) * (s - c)) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + 0.5 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if (typeOfConnection.value === "С11" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * (s * s) * Tan(a * pi / 180) + 0.75 * (e * g)
        crossSectionalArea = thickness * gap + 0.5 * (thickness * thickness) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight);

    } else if (typeOfConnection.value === "С13" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((0.785 * Rgib) * (0.785 * Rgib)) + Rgib * (s - c - Rgib) + 0.5 * ((s - c) * (s - c)) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + ((0.785 * radiusTransition) * (0.785 * radiusTransition)) + radiusTransition * (thickness - blunting - radiusTransition) + 0.5 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if (typeOfConnection.value === "С14" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * (((h - c) * (h - c)) * Tan(a * pi / 180) + ((s - h) * (s - h)) * Tan(betta * pi / 180)) + ((s - h) * (h - c)) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + 0.5 * ((refractiveHeight - blunting) * (refractiveHeight - blunting)) * Math.tan(angleAlpha * pi / 180) + ((thickness - refractiveHeight) * (thickness - refractiveHeight)) * Math.tan(angleBetta * pi / 180) + ((thickness - refractiveHeight) * (refractiveHeight - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if (typeOfConnection.value === "С15" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        // Fn = s * b + 0.25 * (s * s) * Tan(a * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + 0.25 * (thickness * thickness) * Math.tan(angleAlpha * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if (typeOfConnection.value === "С16" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = (1.57 * Rgib) * (1.57 * Rgib) + (s - c - 2 * Rgib) * Rgib + 0.25 * ((s - c - 2 * Rgib) * (s - c - 2 * Rgib)) * Tan(a * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = (1.57 * radiusTransition) * (1.57 * radiusTransition) + (thickness - blunting - 2 * radiusTransition) * radiusTransition + 0.25 * ((thickness - blunting - 2 * radiusTransition) * (thickness - blunting - 2 * radiusTransition)) * Math.tan(angleAlpha * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if (typeOfConnection.value === "С43" && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + (0.5 * (h * h)) * Tan(a * pi / 180) + ((s - c - h) * (s - c - h)) * Tan(betta * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + (0.5 * (refractiveHeight * refractiveHeight)) * Math.tan(angleAlpha * pi / 180) + ((thickness - blunting - refractiveHeight) * (thickness - blunting - refractiveHeight)) * Math.tan(angleBetta * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С17" || typeOfConnection.value === "С18" || typeOfConnection.value === "С21") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + (s - c) * (s - c) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + (thickness - blunting) * (thickness - blunting) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С20") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = (s + b) * b + (s - c) * (s - c) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = (thickness + gap) * gap + (thickness - blunting) * (thickness - blunting) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С45") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + (s - c) * (s - c) * Tan(a * pi / 180) + 0.5 * f * (2 * h - f) + ((0.3925 * f) * (0.3925 * f)) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + (thickness - blunting) * (thickness - blunting) * Math.tan(angleAlpha * pi / 180) + 0.5 * distanceBetweenEdgesCitcularSelection * (2 * refractiveHeight - distanceBetweenEdgesCitcularSelection) + ((0.3925 * distanceBetweenEdgesCitcularSelection) * (0.3925 * distanceBetweenEdgesCitcularSelection)) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С23") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((1.57 * Rgib) * (1.57 * Rgib)) + (s - c - Rgib) * 2 * Rgib + ((s - c - Rgib) * (s - c - Rgib)) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + ((1.57 * radiusTransition) * (1.57 * radiusTransition)) + (thickness - blunting - radiusTransition) * 2 * radiusTransition + ((thickness - blunting - radiusTransition) * (thickness - blunting - radiusTransition)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С24") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((s - h) * (s - h)) * Tan(a * pi / 180) + ((h - c) * (h - c)) * Tan(betta * pi / 180) + 2 * (h - c) * (s - h) * Tan(betta * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + ((thickness - refractiveHeight) * (thickness - refractiveHeight)) * Math.tan(angleAlpha * pi / 180) + ((refractiveHeight - blunting) * (refractiveHeight - blunting)) * Math.tan(angleBetta * pi / 180) + 2 * (refractiveHeight - blunting) * (thickness - refractiveHeight) * Math.tan(angleBetta * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С25") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * ((s - c) * (s - c)) * Tan(a * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + 0.5 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "С26") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((3.14 * Rgib) * (3.14 * Rgib)) + ((s - c - 3 * Rgib) * (s - c - 3 * Rgib)) * Rgib + 0.5 * ((s - c - 3 * Rgib) * (s - c - 3 * Rgib)) * Tan(a * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + ((3.14 * radiusTransition) * (3.14 * radiusTransition)) + ((thickness - blunting - 3 * radiusTransition) * (thickness - blunting - 3 * radiusTransition)) * radiusTransition + 0.5 * ((thickness - blunting - 3 * radiusTransition) * (thickness - blunting - 3 * radiusTransition)) * Math.tan(angleAlpha * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "С27") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((2 * h) * (3 * h)) * Tan(a * pi / 180) + 0.5 * ((s - c - 2 * h) * (s - c - 2 * h)) * Tan(betta * pi / 180) + 2 * h * (s - c - 2 * h) * Tan(betta * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + ((2 * refractiveHeight) * (3 * refractiveHeight)) * Math.tan(angleAlpha * pi / 180) + 0.5 * ((thickness - blunting - 2 * refractiveHeight) * (thickness - blunting - 2 * refractiveHeight)) * Math.tan(angleBetta * pi / 180) + 2 * refractiveHeight * (thickness - blunting - 2 * refractiveHeight) * Math.tan(angleBetta * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "С39") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + (h * h) * Tan(a * pi / 180) + ((s - c - h) * (s - c - h)) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + (refractiveHeight * refractiveHeight) * Math.tan(angleAlpha * pi / 180) + ((thickness - blunting - refractiveHeight) * (thickness - blunting - refractiveHeight)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "С40") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((1.57 * Rgib) * (1.57 * Rgib)) + 2 * Rgib * (h - Rgib) + ((h - Rgib) * (h - Rgib)) * Tan(a * pi / 180) + ((s - c - h) * (s - c - h)) * Tan(betta * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + ((1.57 * radiusTransition) * (1.57 * radiusTransition)) + 2 * radiusTransition * (refractiveHeight - radiusTransition) + ((refractiveHeight - radiusTransition) * (refractiveHeight - radiusTransition)) * Math.tan(angleAlpha * pi / 180) + ((thickness - blunting - refractiveHeight) * (thickness - blunting - refractiveHeight)) * Math.tan(angleBetta * pi / 180) + 0.75 * (weldWidth * gainHeight + weldWidthSecond * gainHeightSecond);

    } else if ((typeOfConnection.value === "У2") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = (s + Rgib) * b + 0.215 * ((s + Rgib) * (s + Rgib)) + 0.75 * (e * g)
        crossSectionalArea = (thickness + radiusTransition) * gap + 0.215 * ((thickness + radiusTransition) * (thickness + radiusTransition)) + 0.75 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "У4(1)") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * (n * n) + n * (s - n) + 0.75 * g * (e - n)
        crossSectionalArea = thickness * gap + 0.5 * (protrusionEnd * protrusionEnd) + protrusionEnd * (thickness - protrusionEnd) + 0.75 * gainHeight * (weldWidth - protrusionEnd);

    } else if ((typeOfConnection.value === "У4(2)") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * (n * n) + 1.05 * e
        crossSectionalArea = thickness * gap + 0.5 * (protrusionEnd * protrusionEnd) + 1.05 * weldWidth;

    } else if ((typeOfConnection.value === "У5(1)") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * (n * n) + n * (s - n) + 0.75 * (e + n) * g + 0.5 * e1
        crossSectionalArea = thickness * gap + 0.5 * (protrusionEnd * protrusionEnd) + protrusionEnd * (thickness - protrusionEnd) + 0.75 * (weldWidth + protrusionEnd) * gainHeight + 0.5 * weldWidthSecond;

    } else if ((typeOfConnection.value === "У5(2)") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * (n * n) + 1.05 * n + 0.5 * (e1 * e1) + 1.05 * e1
        crossSectionalArea = thickness * gap + 0.5 * (protrusionEnd * protrusionEnd) + 1.05 * protrusionEnd + 0.5 * (weldWidthSecond * weldWidthSecond) + 1.05 * weldWidthSecond;

    } else if ((typeOfConnection.value === "У7" || typeOfConnection.value === "Т7") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.5 * ((s - c) * (s - c)) * Tan(a * pi / 180) + 0.75 * (e * g) + 0.5 * (e1 * e1) + 1.05 * e1
        crossSectionalArea = thickness * gap + 0.5 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * weldWidth) + 0.5 * (weldWidthSecond * weldWidthSecond) + 1.05 * weldWidthSecond;

    } else if ((typeOfConnection.value === "У8") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.25 * ((s - c) * (s - c)) * Tan(a * pi / 180) + 0.75 * (e * g + e1 * g1)
        crossSectionalArea = thickness * gap + 0.25 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * weldWidth + weldWidthSecond * weldWidthSecond);

    } else if ((typeOfConnection.value === "У9") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((s - c) * (s - c)) * Tan(a * pi / 180) + 0.75 * (e * g)
        crossSectionalArea = thickness * gap + 0.25 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * weldWidth);

    } else if ((typeOfConnection.value === "У10") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + ((s - c) * (s - c)) * Tan(a * pi / 180) + 0.75 * (e * g) + 0.5 * (e1 * e1) + 1.05 * e1
        crossSectionalArea = thickness * gap + ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * weldWidth) + 0.5 * (weldWidthSecond * weldWidthSecond) + 1.05 * weldWidthSecond;

    } else if ((typeOfConnection.value === "Т1") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = 0.5 * (e * e) + 1.05 * e
        crossSectionalArea = 0,5 * (weldWidth * weldWidth) + 1.05 * weldWidth;

    } else if ((typeOfConnection.value === "Т3") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = e * e + 2.1 * e
        crossSectionalArea = weldWidth * weldWidth + 2.1 * weldWidth;

    } else if ((typeOfConnection.value === "Т2") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.785 * (Rgib * Rgib) + (s - c - Rgib) * Rgib + 0.5 * ((s - c - Rgib) * (s - c - Rgib)) * Tan(a * pi / 180) + 0.75 * (e * g) + 0.5 * (e1 * e1) + 1.05 * e1
        crossSectionalArea = thickness * gap + 0.785 * (radiusTransition * radiusTransition) + (thickness - blunting - radiusTransition) * radiusTransition + 0.5 * ((thickness - blunting - radiusTransition) * (thickness - blunting - radiusTransition)) * Math.tan(angleAlpha * pi / 180) + 0.75 * (weldWidth * gainHeight) + 0.5 * (weldWidthSecond * weldWidthSecond) + 1.05 * weldWidthSecond;

    } else if ((typeOfConnection.value === "Т8") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.25 * ((s - c) * (s - c)) * Tan(a * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + 0.25 * ((thickness - blunting) * (thickness - blunting)) * Math.tan(angleAlpha * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "Т9") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 0.25 * ((s - (1 / 3 * s)) * (s - (1 / 3 * s))) * Tan(a * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + 0.25 * ((thickness - (1 / 3 * thickness)) * (thickness - (1 / 3 * thickness))) * Math.tan(angleAlpha * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "Т5") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = s * b + 1.57 * (Rgib * Rgib) + (s - c - Rgib) * Rgib + 0.25 * ((s - c - 2 * Rgib) * (s - c - 2 * Rgib)) * Tan(a * pi / 180) + 1.5 * (e * g)
        crossSectionalArea = thickness * gap + 1.57 * (radiusTransition * radiusTransition) + (thickness - blunting - radiusTransition) * radiusTransition + 0.25 * ((thickness - blunting - 2 * radiusTransition) * (thickness - blunting - 2 * radiusTransition)) * Math.tan(angleAlpha * pi / 180) + 1.5 * (weldWidth * gainHeight);

    } else if ((typeOfConnection.value === "Н1") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = (e * e) / 2 + 1.05 * e * h
        crossSectionalArea = (weldWidth * weldWidth) / 2 + 1.05 * weldWidth * refractiveHeight;
    } 
    else if ((typeOfConnection.value === "Н2") && (technicalDocumentation.value === 'ГОСТ 5264' || technicalDocumentation.value === 'ГОСТ 14771')) {
        //Fn = ((e * e) / 2 + 1.05 * e * h) * 2
        crossSectionalArea = ((weldWidth * weldWidth) / 2 + 1.05 * weldWidth * refractiveHeight) * 2;
    };

    //Вычисление расхода
    weldLength = diameter * pi; //Длина сварного шва (Lh = d * pi)
    massDepositedMetal = specificDensityDirectedMetal * crossSectionalArea; //Масса наплавленного металла (Mn = p * Fn)
    /* if (selectedWeldingMethod.value === 'MMA Ручная дуговая сварка РД') {
        consumptionRateSpecific = electrodeLossCoefficientMma * massDepositedMetal; //Удельная норма расхода электродов (Ge = kprd * Mn)
    } else if (selectedWeldingMethod.value === 'MIG/MAG Полуавтоматическая сварка МП') {
        consumptionRateSpecific = wireLossCoefficientMag * massDepositedMetal; //Удельная норма расхода проволоки (Ge = kpmp * Mn)
    } else if (selectedWeldingMethod.value === 'TIG Ручная аргонодуговая сварка РАД') {
        consumptionRateSpecific = rodLossCoefficientTig * massDepositedMetal; //Удельная норма расхода проволоки (Ge = kprad * Mn)
    } else if (selectedWeldingMethod.value === 'SAW Автоматическая сварка под флюсом АФ') {
        consumptionRateSpecific = wireLossCoefficientSaw * massDepositedMetal; //Удельная норма расхода проволоки (Ge = kpaf * Mn)
    } */
    mineTime = (massDepositedMetal * 60 * (10 * 10 * 10)) / (surfacingCoefficient * weldingCurrent); //Основное (машинное) время сварки (t_o = (Mn * 60 * (10 * 10 * 10)) / (ah * Isv))
    additionGasConsumption = rotameterConsumption * preparationTime; //Дополнительный расход газа (Qpz = Qr_o * Tpz)
    gasConsumptionRateSpecific = rotameterConsumption * mineTime; //Удельная норма расхода газа (Qr = Qr_o * t_o)
    gasConsumptionRate = ((rotameterConsumption * weldLength) + additionGasConsumption) / 1000; //расход газа для труб (МП) (Hgas = ((Qr * Lh) + Qpz) / 1000)
    consumptionRate = consumptionRateSpecific * weldLength; //Норма расхода сварночных материалов (He = Ge * Lh)
    consumptionRateMeter = consumptionRateSpecific * weldLengthMeter; //Норма расхода сварочных материалов на 1 метр шва (Hem = Ge * Lhm)
    gasConsumptionRateMeter = ((gasConsumptionRateSpecific * weldLengthMeter) + additionGasConsumption) / 1000; //Расход газа на 1 метр шва (Hgasm = ((Qr * Lhm) + Qpz) / 1000)
    fluxConsumptionRate = 1.2 * consumptionRate; //Норма расхода флюса (Hflux = 1.2 * He)

    //Отображение контента после рассчета
    const resultBlock = document.getElementById('result');
    resultBlock.style.visibility = 'visible';
    console.log(thickness);
});









