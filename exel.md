# Переменные - термины сварного соединения
connectionType - вид соединения типа С1, С2
thickness - толщина металла (S, мм)
gap - зазор (b, мм)
blunting - притупление (c, мм)
weldWidth - ширина сварного шва (e, мм)
gainHeight - высота усиления (g, мм)
angleAlpha - угол альфа (градусы)
weldWidthSecond - ширина второго сварного шва (e1, мм)
gainHeightSecond - высота усиления второго сварного шва (g1, мм)
radiusTransition - радиус перехода от торца к притуплению (R, градусов)
angleBetta - угол бетта (градусы)
refractiveHeight - высота начала преломления угла скоса торца (h, мм)
protrusionEnd - величина выступания торца заготовки в угловом соединении (n, мм)
distanceBetweenEdgesCitcularSelection - расстояние между кромками "круглой" выборки (f, мм)

# Переменные для формул
consumptionRate - норма расхода для MMA - He
consumptionRateMeter - норма расхода для MMA на 1 метр сварного шва - Hem
consumptionRateSpecific - удельная норма расхода для MMA - Ge
weldLength - длина сварного шва - Lh
weldLengthMeter - длина сварного шва равная 1 метр - Lh1m
diameter - диаметр - d
crossSectionalArea - площадь поперечного сечения - Fn
massDepositedMetal - масса наплавленного металла - Mn
angleAlpha - угол альфа - a
thickness - толщина металла - s
gap - зазор - b
blunting - притупление - c
weldWidth - ширина сварного шва - e
gainHeight - высота усиления - g
calculationError - ошибка вычисления

# Математические константы
const pi = 3.14 - определение константы Пи
const meter = 1000 - определение длины 1 метр (1000 мм)
let position - объявление переменной для рассчета - i
let nameWeldingMethod - объявление переменной для рассчета - nazv
# Газ и флюс
gasConsumptionRate - норма расхода газа - Hgas
gasConsumptionRateMeter - норма расхода газа на 1 метр - Hgasm
gasConsumptionRateSpecific - удельная норма расхода газа - Qr
mineTime - основное время - t_o
additionGasConsumption - дополнительный расход газа - Qpz
fluxConsumptionRate - норма расхода флюса - Hflux 

# Объявление констант для формул
rotameterConsumption = 5 - расход по ротаметру - Qr_o
surfacingCoefficient = 15.1 - коэффициент наплавки - ah
weldingCurrent = 250 - сварочный ток - Isv
preparationTime = 0.05 - время на подготовку - Tpz
radiusForSto = 5 - радиус для СТО ЦКТИ
# -----------------------------------------------------
const specificDensityDirectedMetal = 0.00785 - удельная плотность наплавленного металла - p
const electrodeLossCoefficientMma = 1.7 - коэффициент расхода, учитывающий неизбежные потери покрытых электродов (MMA) - kprd
const wireLossCoefficientMag = 1.15 - коэффициент расхода, учитывающий неизбежные потери проволоки (MIG/MAG) - kpmp
const rodLossCoefficientTig = 1.1 - коэффициент расхода, учитывающий неизбежные потери прутков (TIG) - kprad
const wireLossCoefficientSaw = 1.02 - коэффициент расхода, учитывающий неизбежные потери проволоки (SAW) - kpaf


# Объявление переменных для ГОСТ 5264 и ГОСТ 14771
weldWidthSecond - ширина второго сварного шва - e1
gainHeightSecond - высота усиления второго сварного шва - g1
radiusTransition - радиус перехода от торца к притуплению - Rgib ????
angleBetta - угол бетта - betta
refractiveHeight - высота начала преломления угла скоса торца - h
protrusionEnd - величина выступания торца заготовки в угловом соединении - n
distanceBetweenEdgesCitcularSelection - расстояние между кромками "круглой" выборки - f

