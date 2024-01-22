//Заполнение полей при выборе
window.addEventListener('load', function (e) {
    //Отлов HTML айтемов
    const weldingMethod = document.getElementById('weldingMethod');
    const technicalDocumentation = document.getElementById('technicalDocumentation');
    const typeOfConnection = document.getElementById('typeOfConnection');
    const thicknessList = document.getElementById('thicknessList');
    const cuttingAngleValue = this.document.getElementById('cuttingAngle');

    //Определение нормативно технической документации
    weldingMethod.addEventListener('change', function() {
        let selectedWeldingMethod = this.value;
        technicalDocumentation.innerHTML = '';
        //РД
        if (selectedWeldingMethod === 'MMA Ручная дуговая сварка РД') {
            let optionFirst = document.createElement('option');
            optionFirst.value = '';
            optionFirst.innerText = '';
            technicalDocumentation.appendChild(optionFirst);

            let optionSecond = document.createElement('option');
            optionSecond.value = 'ГОСТ 5264';
            optionSecond.innerText = 'ГОСТ 5264';
            technicalDocumentation.appendChild(optionSecond);

            let optionThird = document.createElement('option');
            optionThird.value = 'ГОСТ 11534';
            optionThird.innerText = 'ГОСТ 11534';
            technicalDocumentation.appendChild(optionThird);
            //МП
        } else if (selectedWeldingMethod === 'MIG/MAG Полуавтоматическая сварка МП') {
            let optionFirst = document.createElement('option');
            optionFirst.value = '';
            optionFirst.innerText = '';
            technicalDocumentation.appendChild(optionFirst);

            let optionSecond = document.createElement('option');
            optionSecond.value = 'ГОСТ 14771';
            optionSecond.innerText = 'ГОСТ 14771';
            technicalDocumentation.appendChild(optionSecond);

            let optionThird = document.createElement('option');
            optionThird.value = 'ГОСТ 23518';
            optionThird.innerText = 'ГОСТ 23518';
            technicalDocumentation.appendChild(optionThird);
            //РАД
        } else if (selectedWeldingMethod === 'TIG Ручная аргонодуговая сварка РАД') {
            let optionFirst = document.createElement('option');
            optionFirst.value = '';
            optionFirst.innerText = '';
            technicalDocumentation.appendChild(optionFirst);

            let optionSecond = document.createElement('option');
            optionSecond.value = 'ГОСТ 16037';
            optionSecond.innerText = 'ГОСТ 16037';
            technicalDocumentation.appendChild(optionSecond);
            //АФ
        } else if (selectedWeldingMethod === 'SAW Автоматическая сварка под флюсом АФ') {
            let optionFirst = document.createElement('option');
            optionFirst.value = '';
            optionFirst.innerText = '';
            technicalDocumentation.appendChild(optionFirst);

            let optionSecond = document.createElement('option');
            optionSecond.value = 'ГОСТ 8713';
            optionSecond.innerText = 'ГОСТ 8713';
            technicalDocumentation.appendChild(optionSecond);
        }
    });

    //Формирование списка соединений в зависимости от ГОСТ
    technicalDocumentation.addEventListener('change', function() {
        var selectedWeldingMethod = weldingMethod.value; 
        if (selectedWeldingMethod === 'MMA Ручная дуговая сварка РД' && technicalDocumentation.value === 'ГОСТ 5264') {
            let typeOfConnectionArray5264 = ["", "С1", "С28", "С3", "С2", "С4", "С5", "С6", "С7", "С42", "С8", "С9", "С10", "С11", "С12", "С13", "С14", "С15", "С16", "С43", "С17", "С18", "С19", "С20", "С21", "С45", "С23", "С24", "С25", "С26", "С27", "С39", "С40", "У1", "У2", "У4(1)", "У4(2)", "У5(1)", "У5(2)", "У6", "У7", "У8", "У9", "У10", "Т1", "Т2", "Т3", "Т5", "Т6", "Т7", "Т8", "Т9", "Н1", "Н2"];
            typeOfConnectionArray5264.forEach(function(value) {
                let optionElement = document.createElement('option');
                optionElement.value = value;
                optionElement.innerText = value;
                typeOfConnection.appendChild(optionElement);
            });
        }
    });

    //Формирование списка толщин для C1
    typeOfConnection.addEventListener('change', function() {
        let selectedWeldingMethod = weldingMethod.value;
        if (selectedWeldingMethod === 'MMA Ручная дуговая сварка РД' && technicalDocumentation.value === 'ГОСТ 5264' && (typeOfConnection.value === "С1" || typeOfConnection.value === "С3")) {
            let thicknessListC1 = ["", "1", "2", "3", "4"];
            thicknessList.innerText = '';
            thicknessListC1.forEach(function(value) {
                let optionElement = document.createElement('option');
                optionElement.value = value;
                optionElement.innerText = value;
                thicknessList.appendChild(optionElement);
            });
            cuttingAngleValue.value = 'Без скоса';
        } else if (selectedWeldingMethod === 'MMA Ручная дуговая сварка РД' && technicalDocumentation.value === 'ГОСТ 5264' && typeOfConnection.value === "С28") {
            let thicknessListC1 = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            thicknessList.innerText = '';
            thicknessListC1.forEach(function(value) {
                let optionElement = document.createElement('option');
                optionElement.value = value;
                optionElement.innerText = value;
                thicknessList.appendChild(optionElement);
            });
            cuttingAngleValue.value = 'Без скоса';
        } else if (selectedWeldingMethod === 'MMA Ручная дуговая сварка РД' && technicalDocumentation.value === 'ГОСТ 5264' && (typeOfConnection.value === "С4" || typeOfConnection.value === "С5" || typeOfConnection.value === "С6")) {
            let thicknessListC1 = ["", "1", "1.5", "2", "2.5", "3", "4"];
            thicknessList.innerText = '';
            thicknessListC1.forEach(function(value) {
                let optionElement = document.createElement('option');
                optionElement.value = value;
                optionElement.innerText = value;
                thicknessList.appendChild(optionElement);
            });
            cuttingAngleValue.value = 'Без скоса';
        } else if (selectedWeldingMethod === 'MMA Ручная дуговая сварка РД' && technicalDocumentation.value === 'ГОСТ 5264' && typeOfConnection.value === "С7") {
            let thicknessListC1 = ["", "2", "3", "4", "5"];
            thicknessList.innerText = '';
            thicknessListC1.forEach(function(value) {
                let optionElement = document.createElement('option');
                optionElement.value = value;
                optionElement.innerText = value;
                thicknessList.appendChild(optionElement);
            });
            cuttingAngleValue.value = 'Без скоса';
        }
    });
});
