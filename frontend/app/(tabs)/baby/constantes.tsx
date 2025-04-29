export const ACBP = {
    image: require("../../../static/images/tables/percentiles/arm-circumference/boys/arm-circumference-boys-p-3-5.jpg"),
    title: "Percentil de la circunferencia del brazo.",
    description: [
        "La circunferencia del brazo del niño está por debajo del 3% de la población de referencia. Esto indica un bajo crecimiento en esa medida. No siempre es motivo de preocupación, pero se recomienda seguimiento por parte del pediatra para valorar su evolución.",
        
        "La circunferencia del brazo del niño está entre el 3% y el 15% de la población. Es menor que la de la mayoría, lo cual puede deberse a un crecimiento más lento. Si hay antecedentes familiares similares, puede ser completamente normal. Aun así, es aconsejable comentarlo con el pediatra y hacer un seguimiento.",
    
        "La circunferencia del brazo del niño está en un rango promedio. Esto indica un crecimiento sano y dentro de lo esperado. No hay motivos de preocupación.",
    
        "La circunferencia del brazo del niño está entre el 85% y el 97% de la población. Esto sugiere un crecimiento algo más acelerado. No suele representar un problema, pero si se acompaña de otros factores (como peso elevado), puede ser útil consultar al pediatra para asegurar que todo está bien.",
    
        "La circunferencia del brazo del niño está por encima del 97% de la población. Tiene una medida significativamente alta. Si el crecimiento es proporcional y saludable, no suele ser un problema, pero se recomienda seguimiento por parte del pediatra para asegurarse de que todo evoluciona correctamente.",
    ],    
    cuadrante:[
        0.762,
        0.68,
        0.571,
        0.462,
        0.353,
        0.243,
    ]
};

export const ACGP = {
    image: require("../../../static/images/tables/percentiles/arm-circumference/girls/arm-circumference-girls-p-3-5.png"),
    title: "Percentil de la circunferencia del brazo.",
    description: [
        "La circunferencia del brazo de la niña está por debajo del 3% de la población de referencia. Esto indica un bajo crecimiento en esa medida. No siempre es motivo de preocupación, pero se recomienda seguimiento por parte del pediatra para valorar su evolución.",
        
        "La circunferencia del brazo de la niña está entre el 3% y el 15% de la población. Es menor que la de la mayoría, lo cual puede deberse a un crecimiento más lento. Si hay antecedentes familiares similares, puede ser completamente normal. Aun así, es aconsejable comentarlo con el pediatra y hacer un seguimiento.",
    
        "La circunferencia del brazo de la niña está en un rango promedio. Esto indica un crecimiento sano y dentro de lo esperado. No hay motivos de preocupación.",
    
        "La circunferencia del brazo de la niña está entre el 85% y el 97% de la población. Esto sugiere un crecimiento algo más acelerado. No suele representar un problema, pero si se acompaña de otros factores (como peso elevado), puede ser útil consultar al pediatra para asegurar que todo está bien.",
    
        "La circunferencia del brazo de la niña está por encima del 97% de la población. Tiene una medida significativamente alta. Si el crecimiento es proporcional y saludable, no suele ser un problema, pero se recomienda seguimiento por parte del pediatra para asegurarse de que todo evoluciona correctamente.",
    ], 
    cuadrante:[
        0.762,
        0.68,
        0.571,
        0.462,
        0.353,
        0.243,
    ]
};
    
export function getHCBP(metrics: {headCircumference?: number}) {
    return {
        image: [
            require("../../../static/images/tables/percentiles/head-circumference/boys/head-circumference-boys-p-0-13.png"),
            require("../../../static/images/tables/percentiles/head-circumference/boys/head-circumference-boys-p-0-2.png"),
            require("../../../static/images/tables/percentiles/head-circumference/boys/head-circumference-boys-p-0-5.png"),
        ],
        title: "Percentil de la circunferencia de la cabeza.",
        description: [
            "La circunferencia de la cabeza del niño está por debajo del 3% de la población. Puede indicar un crecimiento más limitado, por lo que sería recomendable que el pediatra lo supervise.",
            
            "Está entre el 3% y el 15% de la población. Es un valor algo menor que el promedio, pero si el desarrollo general es bueno y hay antecedentes similares en la familia, puede no ser preocupante, pero es conviene comentarlo con el pediatra.",
            
            "El valor se encuentra dentro del promedio esperado. La circunferencia de la cabeza está creciendo de manera adecuada y proporcional.",
            
            "Está entre el 85% y el 97% de la población. Es más grande que la mayoría, lo cual no suele representar un problema. Aun así, es aconsejable vigilar su evolución con el pediatra si hay otros signos asociados.",
            
            "La medida está por encima del 97%. Una cabeza más grande puede ser normal si el resto del desarrollo es armónico. Se sugiere una revisión pediátrica para asegurarse de que todo está dentro de lo saludable.",
        ],
        
        cuadrante:[
            [   
                0.722,
                0.722,
                0.682,
                0.642,
                0.602,
                0.563,
                0.523,
                0.483,
                0.443,
                0.403,
                0.363,
                0.323,
                0.283,
                0.243,
            ],
            [
                0.762,
                0.503,
                0.242
            ],
            [
                0.762,
                0.658,
                0.555,
                0.451,
                0.348,
                0.243,
            ],
        ],
        metrica:[
            20.4*(2*((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 43.5 ? 43.5 - 31.5 : (metrics?.headCircumference ?? 31.5) - 31.5)),
            12*(2*((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 52 ? 52 - 31.5 : (metrics?.headCircumference ?? 31.5)- 31.5)),
            21.8*((metrics?.headCircumference ?? 32) < 32 ? 0 :
            (metrics?.headCircumference ?? 32) > 54.5 ? 54.5 - 32 : (metrics?.headCircumference ?? 32)- 32),
        ]
    };
}

export function getHCGP(metrics: {headCircumference?: number}) {
    return{
        image: [
            require("../../../static/images/tables/percentiles/head-circumference/girls/head-circumference-girls-p-0-13.png"),
            require("../../../static/images/tables/percentiles/head-circumference/girls/head-circumference-girls-p-0-2.png"),
            require("../../../static/images/tables/percentiles/head-circumference/girls/head-circumference-girls-p-0-5.png"),
        ],
        title: "Percentil de la circunferencia de la cabeza.",
        description: [
            "La circunferencia de la cabeza de la niña está por debajo del 3% de la población. Puede indicar un crecimiento más limitado, por lo que sería recomendable que el pediatra lo supervise.",
            
            "Está entre el 3% y el 15% de la población. Es un valor algo menor que el promedio, pero si el desarrollo general es bueno y hay antecedentes similares en la familia, puede no ser preocupante, pero es conviene comentarlo con el pediatra.",
            
            "El valor se encuentra dentro del promedio esperado. La circunferencia de la cabeza está creciendo de manera adecuada y proporcional.",
            
            "Está entre el 85% y el 97% de la población. Es más grande que la mayoría, lo cual no suele representar un problema. Aun así, es aconsejable vigilar su evolución con el pediatra si hay otros signos asociados.",
            
            "La medida está por encima del 97%. Una cabeza más grande puede ser normal si el resto del desarrollo es armónico. Se sugiere una revisión pediátrica para asegurarse de que todo está dentro de lo saludable.",
        ],
        
        cuadrante:[
            [   
                0.762,
                0.722,
                0.682,
                0.642,
                0.602,
                0.563,
                0.523,
                0.483,
                0.443,
                0.403,
                0.363,
                0.323,
                0.283,
                0.243,
            ],
            [
                0.762,
                0.502,
                0.241
            ],
            [
                0.762,
                0.658,
                0.555,
                0.451,
                0.348,
                0.243,
            ],
        ],
        metrica:[
            42.45*((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 42.5 ? 42.5 - 31 : (metrics?.headCircumference ?? 31.5) - 31),
            24*(((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 51 ? 51 - 30.5 : (metrics?.headCircumference ?? 31.5) - 30.5)),
            21.8*((metrics?.headCircumference ?? 32) < 32 ? 0 :
            (metrics?.headCircumference ?? 32) > 53.5 ? 53.5 - 32 : (metrics?.headCircumference ?? 32)- 32),
        ]
    }
};
    
export function getHBP(metrics: {height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/percentiles/length-height/boys/height-boys-p-0-6.png"),
            require("../../../static/images/tables/percentiles/length-height/boys/height-boys-p-0-2.png"),
            require("../../../static/images/tables/percentiles/length-height/boys/height-boys-p-2-5.png"),
        ],
        title: "Percentil de la altura",
        description: [
            "La estatura del niño está por debajo del 3%. Esto puede reflejar un crecimiento más lento, por lo que es importante hacer un seguimiento junto al pediatra para entender su evolución.",
            
            "Se encuentra entre el 3% y el 15%. Es una estatura algo más baja que la media, aunque puede ser normal dependiendo de la genética familiar. Se recomienda observar su crecimiento con el tiempo y consultar al pediatra.",
            
            "La estatura está dentro del rango habitual. El crecimiento del niño es adecuado para su edad y no se detectan señales de alerta.",
            
            "El valor está entre el 85% y el 97%. El niño es más alto que la mayoría. Esto puede ser completamente normal y simplemente reflejar su constitución o antecedentes familiares.",
            
            "Está por encima del 97%. Una estatura significativamente mayor puede ser normal si todo está proporcionado. Aun así, se recomienda que el pediatra valore su desarrollo general.",
        ],
        
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.764,
                0.742,
                0.720,
                0.698,
                0.677,
                0.655,
                0.633,
                0.611,
                0.589,
                0.567,
                0.546,
                0.524,
                0.502,
                0.480,
                0.458,
                0.436,
                0.414,
                0.392,
                0.370,
                0.349,
                0.327,
                0.305,
                0.283,
                0.261,
                0.240,
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            17.1* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 73 ? 73 - 45 :((metrics?.height ?? 45) - 45)),
            9.55* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 95 ? 95 - 45 : ((metrics?.height ?? 45) - 45)),
            12 * ((metrics?.height ?? 80) < 80 ? 0 : 
            (metrics?.height ?? 80) > 120 ? 120 - 80 : ((metrics?.height ?? 80) - 80))
        ]
    };
}
    
export function getHGP(metrics: {height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/percentiles/length-height/girls/height-girls-p-0-6.png"),
            require("../../../static/images/tables/percentiles/length-height/girls/height-girls-p-0-2.png"),
            require("../../../static/images/tables/percentiles/length-height/girls/height-girls-p-2-5.png"),
        ],
        title: "Percentil de la altura",
        description: [
            "La estatura de la niña está por debajo del 3%. Esto puede reflejar un crecimiento más lento, por lo que es importante hacer un seguimiento junto al pediatra para entender su evolución.",
            
            "Se encuentra entre el 3% y el 15%. Es una estatura algo más baja que la media, aunque puede ser normal dependiendo de la genética familiar. Se recomienda observar su crecimiento con el tiempo y consultar al pediatra.",
            
            "La estatura está dentro del rango habitual. El crecimiento de la niña es adecuado para su edad y no se detectan señales de alerta.",
            
            "El valor está entre el 85% y el 97%. La niña es más alta que la mayoría. Esto puede ser completamente normal y simplemente reflejar su constitución o antecedentes familiares.",
            
            "Está por encima del 97%. Una estatura significativamente mayor puede ser normal si todo está proporcionado. Aun así, se recomienda que el pediatra valore su desarrollo general.",
        ],
        
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.762,
                0.502,
                0.241
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            17.1* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 73 ? 73 - 45 :((metrics?.height ?? 45) - 45)),
            9.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 95 ? 95 - 45 : ((metrics?.height ?? 45)  - 45)),
            12 * ((metrics?.height ?? 80) < 80 ? 0 : 
            (metrics?.height ?? 80) > 120 ? 120 - 80 : ((metrics?.height ?? 80) - 80))
        ]
    };
}
    
export function getWBP(metrics: {weight?: number}) {
    return {
        image: [
            require("../../../static/images/tables/percentiles/weight/boys/weight-boys-p-0-6.png"),
            require("../../../static/images/tables/percentiles/weight/boys/weight-boys-p-0-2.png"),
            require("../../../static/images/tables/percentiles/weight/boys/weight-boys-p-2-5.png"),
        ],
        title: "Percentil del peso",
        description: [
            "El peso del niño está por debajo del 3% de la referencia poblacional. Es importante prestar atención a su evolución y consultar con el pediatra para valorar si hay algún factor que esté afectando su crecimiento.",
            
            "Se sitúa entre el 3% y el 15%. Aunque es un peso menor que el de la mayoría, puede ser parte de su constitución. Aun así, conviene hacer seguimiento con el pediatra para asegurar un desarrollo saludable.",
            
            "El peso se encuentra en un rango adecuado. Indica que el niño está creciendo de forma equilibrada.",
            
            "Está entre el 85% y el 97%. Tiene un peso por encima del promedio, lo cual no es preocupante si se mantiene una proporción adecuada con la talla. Puede ser útil consultarlo con el pediatra si hay dudas.",
            
            "Está por encima del 97%. Esto podría indicar tendencia al sobrepeso, aunque también puede estar dentro de lo normal según la contextura. Se recomienda comentarlo con el pediatra.",
        ],
        
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.764,
                0.742,
                0.720,
                0.698,
                0.677,
                0.655,
                0.633,
                0.611,
                0.589,
                0.567,
                0.546,
                0.524,
                0.502,
                0.480,
                0.458,
                0.436,
                0.414,
                0.392,
                0.370,
                0.349,
                0.327,
                0.305,
                0.283,
                0.261,
                0.240,
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            56 * ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 10.3 ? 10.3 - 1.75 : ((metrics?.weight ?? 1) - 1.75)),
            30.4* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 16.6 ? 16.6 - 1 : ((metrics?.weight ?? 1) - 1)),
            29.83 * ((metrics?.weight ?? 8) < 8 ? 0 : 
            (metrics?.weight ?? 1) > 24.6 ? 24.6 - 8.5 : ((metrics?.weight ?? 8) - 8.5))
        ]
    };
}
    
export function getWGP(metrics: {weight?: number}) {
    return {
        image: [
            require("../../../static/images/tables/percentiles/weight/girls/weight-girls-p-0-6.png"),
            require("../../../static/images/tables/percentiles/weight/girls/weight-girls-p-0-2.png"),
            require("../../../static/images/tables/percentiles/weight/girls/weight-girls-p-2-5.png"),
        ],
        title: "Percentil del peso",
        description: [
            "El peso de la niña está por debajo del 3% de la referencia poblacional. Es importante prestar atención a su evolución y consultar con el pediatra para valorar si hay algún factor que esté afectando su crecimiento.",
            
            "Se sitúa entre el 3% y el 15%. Aunque es un peso menor que el de la mayoría, puede ser parte de su constitución. Aun así, conviene hacer seguimiento con el pediatra para asegurar un desarrollo saludable.",
            
            "El peso se encuentra en un rango adecuado. Indica que la niña está creciendo de forma equilibrada.",
            
            "Está entre el 85% y el 97%. Tiene un peso por encima del promedio, lo cual no es preocupante si se mantiene una proporción adecuada con la talla. Puede ser útil consultarlo con el pediatra si hay dudas.",
            
            "Está por encima del 97%. Esto podría indicar tendencia al sobrepeso, aunque también puede estar dentro de lo normal según la contextura. Se recomienda comentarlo con el pediatra.",
        ],
        
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.762,
                0.502,
                0.241
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            56 * ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 10.3 ? 10.3 - 1.75 : ((metrics?.weight ?? 1) - 1.75)),
            33.3* (( metrics?.weight ?? 1) < 1.2 ? 0.2 : 
            (metrics?.weight ?? 1) > 15.7 ? 15.7 - 1 : ((metrics?.weight ?? 1) - 1.2)),
            28.83 * ((metrics?.weight ?? 8) < 8 ? 0 : 
            (metrics?.weight ?? 1) > 25.6 ? 25.6 - 8.5 : ((metrics?.weight ?? 8) - 8.5))
        ]
    };
}

export function getWFHBP(metrics: {weight?: number, height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/percentiles/weight-for-length-height/boys/weight-for-height-boys-p-0-2.png"),
            require("../../../static/images/tables/percentiles/weight-for-length-height/boys/weight-for-height-boys-p-2-5.png"),
        ],
        title: ["Percentil del peso entre la altura"],
        description: [
            "La relación entre el peso y la altura está por debajo del 3%. Puede reflejar una delgadez marcada. Es aconsejable consultar con el pediatra para valorar si hay que hacer ajustes en la alimentación o el seguimiento.",
            
            "Está entre el 3% y el 15%. Esta proporción es algo más baja que lo habitual, aunque en muchos casos es normal. Recomendamos mantener el control con el pediatra para asegurarse de que se mantiene un crecimiento saludable.",
            
            "La relación peso-altura está en un rango considerado saludable. Indica un equilibrio adecuado entre ambas medidas.",
            
            "Entre el 85% y el 97%. El peso es elevado en relación con la altura. Aunque no siempre es preocupante, es recomendable evaluar con el pediatra si hay riesgo de sobrepeso.",
            
            "Por encima del 97%. Puede indicar exceso de peso en comparación con la altura. Sería conveniente consultar con el pediatra para valorar el desarrollo general y los hábitos alimentarios.",
        ],
        
        height:[
            11.52* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 110 ? 110 - 45 : ((metrics?.height ?? 45) - 45)),
            13.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 120 ? 120 - 65 : ((metrics?.height ?? 65) - 65)),
        ],
        weight:[
            21.8* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 23 ? 23 - 1 : ((metrics?.weight ?? 1) - 1)),
            20.8* ((metrics?.weight ?? 5) < 5 ? 0 : 
            (metrics?.weight ?? 5) > 28 ? 28 - 5 : ((metrics?.weight ?? 5) - 5)),
        ]
    };
}

export function getWFHGP(metrics: {weight?: number, height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/percentiles/weight-for-length-height/girls/weight-for-height-girls-p-0-2.png"),
            require("../../../static/images/tables/percentiles/weight-for-length-height/girls/weight-for-height-girls-p-2-5.png"),
        ],
        title: "Percentil del peso entre la altura",
        description: [
            "La relación entre el peso y la altura está por debajo del 3%. Puede reflejar una delgadez marcada. Es aconsejable consultar con el pediatra para valorar si hay que hacer ajustes en la alimentación o el seguimiento.",
            
            "Está entre el 3% y el 15%. Esta proporción es algo más baja que lo habitual, aunque en muchos casos es normal. Recomendamos mantener el control con el pediatra para asegurarse de que se mantiene un crecimiento saludable.",
            
            "La relación peso-altura está en un rango considerado saludable. Indica un equilibrio adecuado entre ambas medidas.",
            
            "Entre el 85% y el 97%. El peso es elevado en relación con la altura. Aunque no siempre es preocupante, es recomendable evaluar con el pediatra si hay riesgo de sobrepeso.",
            
            "Por encima del 97%. Puede indicar exceso de peso en comparación con la altura. Sería conveniente consultar con el pediatra para valorar el desarrollo general y los hábitos alimentarios.",
        ],
        
        height:[
            11.52* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 110 ? 110 - 45: ((metrics?.height ?? 45) - 45)),
            13.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 120 ? 120 : ((metrics?.height ?? 65) - 65)),
        ],
        weight:[
            21.8* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 23 ? 23 - 1: ((metrics?.weight ?? 1) - 1)),
            20.8* ((metrics?.weight ?? 5) < 5 ? 0 : 
            (metrics?.weight ?? 5) > 28 ? 28 : ((metrics?.weight ?? 5) - 5)),
        ]
    };
}

export const ACBZ = {
    image: require("../../../static/images/tables/z-scores/arm-circumference/boys/arm-circumference-boys-z-3-5.png"),
    title: "Puntuaciones z de la circunferencia del brazo.",
    description: [
        // z < -3
        "Su niño tiene una medida del brazo que está muy por debajo de lo que se considera normal para su edad." +
        "Esto no es algo menor: podría indicar que no está recibiendo los nutrientes necesarios para crecer bien. " +
        "Es muy importante que consultes con su pediatra lo antes posible. Con el acompañamiento adecuado, " +
        "es posible revertir esta situación y ayudarle a desarrollarse con fuerza y salud.",

        // -3 ≤ z < -2
        "La medida del brazo de tu hijo está por debajo del rango considerado saludable para su edad. " +
        "Esto podría ser una señal temprana de que necesita más apoyo nutricional o un seguimiento especial. " +
        "No es una emergencia, pero sí es una llamada de atención. Prestar atención ahora puede evitar problemas más adelante. " +
        "Una visita al pediatra puede darte claridad sobre los próximos pasos.",

        // -2 ≤ z < -1
        "La medida de tu hijo está algo por debajo del promedio esperado. Esto no quiere decir que haya un problema grave, " +
        "pero sí conviene observar cómo evoluciona. Tal vez necesite un poco más de variedad en la alimentación o un " +
        "refuerzo en sus hábitos diarios. Lo importante es estar atentos y seguir acompañando su crecimiento con cuidado.",

        // -1 ≤ z ≤ 1
        "Tu hijo está exactamente en el rango esperado para su edad. Esto significa que su crecimiento va bien, " + 
        "sin señales de alerta. Es una excelente noticia, y una muestra de que los cuidados que le estás dando están " + 
        "funcionando. Aun así, siempre es buena idea seguir con los chequeos y mantener los buenos hábitos en casa.",

        // 1 < z ≤ 2
        "La medida del brazo de tu hijo está un poco por encima de lo habitual para su edad, pero sin salirse del rango " + 
        "saludable. Esto suele reflejar una buena nutrición o simplemente su contextura natural. No es motivo de preocupación, " + 
        "pero sí de seguimiento. Es una buena oportunidad para seguir cultivando hábitos sanos desde pequeños.",

        // 2 < z ≤ 3
        "La medida del brazo está bastante por encima del promedio esperado. Aunque algunos niños tienen naturalmente una " +
        "contextura más grande, es importante prestar atención para asegurarse de que todo está en equilibrio. Una charla con el " +
        "pediatra puede ayudarte a ver si hace falta algún ajuste en su rutina o alimentación.",

        // z > 3
        "Tu hijo tiene una medida que está muy por encima de lo que se considera común para su edad. Esto no significa que " + 
        "haya un problema grave, pero sí es algo que merece ser revisado. Es posible que esté ganando peso más rápido de lo " +
        "deseado, y eso puede afectar otras áreas de su desarrollo. Consultar con su médico puede darte claridad y tranquilidad."
    ], 
    cuadrante:[
        0.762,
        0.68,
        0.571,
        0.462,
        0.353,
        0.243,
    ]
};

export const ACGZ = {
    image: require("../../../static/images/tables/z-scores/arm-circumference/girls/arm-circumference-girls-z-3-5.png"),
    title: "Puntuaciones z de la circunferencia del brazo.",
    description: [
        // z < -3
        "Tu hija tiene una medida del brazo que está muy por debajo de lo que se considera normal para su edad. " +
        "Esto puede ser una señal de que no está recibiendo todos los nutrientes que necesita para crecer de forma saludable. " +
        "Es muy importante que consultes con su pediatra lo antes posible. Con apoyo y seguimiento, es posible mejorar su estado " +
        "y acompañar su desarrollo con seguridad.",

        // -3 ≤ z < -2
        "La medida del brazo de tu hija está por debajo del rango saludable para su edad. Aunque no es una situación grave, " +
        "sí es una señal a la que conviene prestarle atención. Puede ser el momento de revisar su alimentación o consultar con " +
        "un especialista para asegurarte de que está creciendo como corresponde. Actuar a tiempo siempre hace una gran diferencia.",

        // -2 ≤ z < -1
        "La medida de tu hija está un poco por debajo del promedio para su edad. Esto no es necesariamente preocupante, pero " +
        "conviene observar cómo evoluciona. Puede que necesite pequeños ajustes en su rutina o alimentación. Lo importante es " +
        "seguir acompañando su crecimiento con atención y cariño.",

        // -1 ≤ z ≤ 1
        "Tu hija se encuentra dentro del rango esperado para su edad. Esto significa que está creciendo bien, y su desarrollo " +
        "físico está en una trayectoria saludable. Es una excelente noticia, y una confirmación de que los cuidados que recibe " +
        "están dando fruto. Continúa con sus buenos hábitos y sus revisiones médicas regulares.",

        // 1 < z ≤ 2
        "La medida del brazo de tu hija está un poco por encima del promedio, pero sigue dentro de lo saludable. Esto puede " +
        "reflejar una buena nutrición o simplemente una contextura natural. No es algo que deba preocuparte, pero sí conviene " +
        "seguir promoviendo hábitos equilibrados y seguir de cerca su evolución.",

        // 2 < z ≤ 3
        "La medida del brazo está bastante por encima de lo común para su edad. Esto puede ser parte de su contextura o reflejar " +
        "una etapa de crecimiento más acelerado. Aun así, es importante mantener el seguimiento médico y asegurarse de que todo " +
        "esté en equilibrio. Consultar con su pediatra puede ayudarte a confirmar que todo va bien.",

        // z > 3
        "Tu hija tiene una medida del brazo muy por encima de lo habitual para su edad. Esto no significa necesariamente que " +
        "exista un problema, pero sí es recomendable revisarlo con el pediatra. Puede ser que esté aumentando de peso rápidamente, " +
        "y eso puede influir en otras áreas de su desarrollo. Con una orientación adecuada, puedes ayudarla a seguir creciendo de " +
        "forma saludable y feliz."
    ], 
    cuadrante:[
        0.762,
        0.68,
        0.571,
        0.462,
        0.353,
        0.243,
    ]
};
    
export function getHCBZ(metrics: {headCircumference?: number}) {
    return {
        image: [
            require("../../../static/images/tables/z-scores/head-circumference/boys/head-circumference-boys-z-0-13.png"),
            require("../../../static/images/tables/z-scores/head-circumference/boys/head-circumference-boys-z-0-2.png"),
            require("../../../static/images/tables/z-scores/head-circumference/boys/head-circumference-boys-z-0-5.png"),
        ],
        title: "Puntuaciones z de la circunferencia de la cabeza.",
        description: [
            // z < -3
            "La medida de la cabeza de tu hijo está muy por debajo de lo habitual para su edad. Esto podría estar relacionado " +
            "con un ritmo de desarrollo más lento del que se espera a su edad. Es fundamental que consultes con un pediatra, " +
            "ya que esta medida puede reflejar aspectos importantes del crecimiento cerebral. Detectarlo pronto permite actuar " +
            "a tiempo y ofrecerle todo el apoyo que necesita para desarrollarse plenamente.",

            // -3 ≤ z < -2
            "La circunferencia de la cabeza de tu hijo es más pequeña de lo esperado. Aunque algunos niños tienen un ritmo de " +
            "crecimiento distinto, esta diferencia merece ser observada. Lo más recomendable es realizar una evaluación médica " +
            "para asegurarse de que todo está avanzando correctamente. Un seguimiento temprano puede marcar una gran diferencia " + 
            "en su desarrollo futuro.",

            // -2 ≤ z < -1
            "Tu hijo tiene una medida de cabeza ligeramente por debajo del promedio. En muchos casos, esto puede ser normal, " + 
            "pero es buena idea observar cómo evoluciona con el tiempo. Llevar un control regular con su pediatra ayudará a " + 
            "confirmar que todo va bien y, si hiciera falta, intervenir de manera temprana.",

            // -1 ≤ z ≤ 1
            "La medida de la cabeza de tu hijo está dentro del rango normal para su edad. Esto indica que su desarrollo físico, " +
            "especialmente en lo relacionado con el crecimiento del cráneo, va como se espera. Puedes sentirte tranquilo: su " +
            "evolución sigue un camino saludable. Continúa con sus revisiones periódicas y estímulos diarios, que son clave en " +
            "estos primeros años.",

            // 1 < z ≤ 2
            "Tu hijo presenta una circunferencia de cabeza ligeramente superior al promedio, algo que muchas veces se relaciona " +
            "con la genética familiar. No representa ningún problema mientras el resto de su desarrollo esté en equilibrio. " +
            "Asegúrate de mantener controles regulares para seguir confirmando que todo va bien.",

            // 2 < z ≤ 3
            "Su medida de cabeza está claramente por encima de lo habitual. Esto puede deberse a un patrón de crecimiento " +
            "propio o a una característica familiar, pero también es algo que conviene revisar. Un chequeo médico puede " +
            "ayudarte a descartar cualquier situación que requiera atención y te dará mayor tranquilidad.",

            // z > 3
            "La medida de la cabeza de tu hijo está muy por encima de lo considerado normal para su edad. Aunque esto no " +
            "siempre indica un problema, sí es importante acudir a una revisión médica para asegurarse de que su crecimiento " +
            "neurológico esté en equilibrio. Un diagnóstico temprano permite anticiparse y cuidar mejor su desarrollo general."
        ],
        
        cuadrante:[
            [   
                0.762,
                0.722,
                0.682,
                0.642,
                0.602,
                0.563,
                0.523,
                0.483,
                0.443,
                0.403,
                0.363,
                0.323,
                0.283,
                0.243,
            ],
            [
                0.762,
                0.503,
                0.242
            ],
            [
                0.762,
                0.658,
                0.555,
                0.451,
                0.348,
                0.243,
            ],
        ],
        metrica:[
            33.8*((metrics?.headCircumference ?? 30) < 30 ? 0 :
            (metrics?.headCircumference ?? 30) > 44.5 ? 44.5 - 30: (metrics?.headCircumference ?? 30) - 30),
            20.4*((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 52 ? 52 - 29 : (metrics?.headCircumference ?? 31.5) - 29),
            18.8*((metrics?.headCircumference ?? 30) < 30 ? 0 :
            (metrics?.headCircumference ?? 30) > 56 ? 56 - 30: (metrics?.headCircumference ?? 30)- 30),
        ]
    };
}

export function getHCGZ(metrics: {headCircumference?: number}) {
    return{
        image: [
            require("../../../static/images/tables/z-scores/head-circumference/girls/head-circumference-girls-z-0-13.png"),
            require("../../../static/images/tables/z-scores/head-circumference/girls/head-circumference-girls-z-0-2.png"),
            require("../../../static/images/tables/z-scores/head-circumference/girls/head-circumference-girls-z-0-5.png"),
        ],
        title: "Puntuaciones z de la circunferencia de la cabeza.",
        description: [
            // z < -3
            "La medida de la cabeza de tu hija está muy por debajo de lo que suele observarse a su edad. Esto puede estar indicando que su crecimiento no está siguiendo el ritmo esperado, y es esencial consultar con su pediatra. Evaluar esta diferencia a tiempo puede ayudar a entender mejor cómo se está desarrollando y tomar decisiones que favorezcan su salud desde ahora.",

            // -3 ≤ z < -2
            "La circunferencia de la cabeza de tu hija está algo por debajo de lo que se considera habitual. Esta diferencia puede no significar un problema por sí sola, pero sí conviene observarla de cerca. Un control médico puede ayudarte a entender si su crecimiento está avanzando como debe o si requiere un poco más de seguimiento especializado.",

            // -2 ≤ z < -1
            "Tu hija tiene una medida de cabeza ligeramente menor a la media. No es algo que deba preocuparte de inmediato, pero sí es recomendable llevar un control de su evolución. Estas pequeñas diferencias, cuando se siguen con atención, permiten actuar a tiempo si llega a ser necesario.",

            // -1 ≤ z ≤ 1
            "La circunferencia de la cabeza de tu hija está dentro del rango esperado. Esto significa que su crecimiento neurológico y físico se está desarrollando de forma adecuada. Es una excelente señal. Seguir con sus chequeos médicos y brindarle estimulación en casa será clave para que continúe creciendo feliz y sana.",

            // 1 < z ≤ 2
            "La medida de la cabeza de tu hija está un poco por encima del promedio. Esto puede ser perfectamente normal y muchas veces está relacionado con la genética. No hay de qué preocuparse si su desarrollo general sigue equilibrado. Asegúrate de mantener sus controles médicos para seguir confirmando que todo va en orden.",

            // 2 < z ≤ 3
            "La circunferencia de la cabeza de tu hija es bastante más grande de lo común para su edad. En muchos casos esto no implica ningún problema, pero es buena idea hacer una evaluación médica para descartar cualquier posible alteración. Un chequeo temprano ofrece tranquilidad y asegura que todo esté evolucionando correctamente.",

            // z > 3
            "Tu hija tiene una medida de cabeza muy por encima de lo que se observa habitualmente en niñas de su edad. Esto puede deberse a factores genéticos o a una etapa de crecimiento particular. Sin embargo, es fundamental que su pediatra la revise para confirmar que todo esté en equilibrio. Detectar cualquier detalle a tiempo siempre será lo mejor para su bienestar."
        ],
        cuadrante:[
            [   
                0.762,
                0.722,
                0.682,
                0.642,
                0.602,
                0.563,
                0.523,
                0.483,
                0.443,
                0.403,
                0.363,
                0.323,
                0.283,
                0.243,
            ],
            [
                0.762,
                0.502,
                0.241
            ],
            [
                0.762,
                0.658,
                0.555,
                0.451,
                0.348,
                0.243,
            ],
        ],
        metrica:[
            36.3*((metrics?.headCircumference ?? 30) < 30 ? 0 :
            (metrics?.headCircumference ?? 30) > 43.5 ? 43.5 - 30  : (metrics?.headCircumference ?? 30) - 30),
            21.3*(((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 51 ? 51 - 29: (metrics?.headCircumference ?? 31.5) - 29)),
            19.6*((metrics?.headCircumference ?? 30) < 30 ? 0 :
            (metrics?.headCircumference ?? 30) > 55 ? 55 - 30 : (metrics?.headCircumference ?? 30)- 30),
        ]
    }
};
    
export function getHBZ(metrics: {height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/z-scores/length-height/boys/height-boys-z-0-6.png"),
            require("../../../static/images/tables/z-scores/length-height/boys/height-boys-z-0-2.png"),
            require("../../../static/images/tables/z-scores/length-height/boys/height-boys-z-2-5.png"),
        ],
        title: "Puntuaciones z de la altura",
        description: [
            "La estatura de tu hijo está muy por debajo del rango esperado para su edad. Esto puede deberse a factores genéticos, alimentarios o de salud. Lo importante es detectarlo pronto. Consultá con su pediatra para entender si es solo una variante natural o si necesita un apoyo especial para crecer.",
            "Tu hijo es más bajito de lo común para su edad. A veces es solo una fase, pero conviene estar atentos. Hacerle un seguimiento médico puede ayudarte a saber si está creciendo al ritmo adecuado.",
            "Su altura está un poco por debajo de la media, pero dentro de límites aceptables. Esto no suele ser preocupante, pero es buena idea observar su evolución en el tiempo y seguir sus controles pediátricos.",
            "Tu hijo tiene una estatura adecuada para su edad. Esto indica que su desarrollo está bien encaminado. Seguí promoviendo hábitos saludables y brindándole estímulos para seguir creciendo feliz.",
            "Su estatura está un poco por encima del promedio. No representa ningún problema mientras crezca de forma equilibrada. Probablemente tenga una contextura más alta que otros niños de su edad.",
            "Es más alto que la mayoría de los niños de su edad. Esto puede reflejar una etapa de crecimiento rápida o una característica familiar. Siempre es buena idea hacer un seguimiento regular para asegurar que todo va bien.",
            "Tu hijo tiene una estatura considerablemente superior a la habitual. Esto no siempre implica un problema, pero sí conviene revisar con un pediatra que todo esté en equilibrio. Crecer bien es más que crecer alto."
        ],
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.764,
                0.742,
                0.720,
                0.698,
                0.677,
                0.655,
                0.633,
                0.611,
                0.589,
                0.567,
                0.546,
                0.524,
                0.502,
                0.480,
                0.458,
                0.436,
                0.414,
                0.392,
                0.370,
                0.349,
                0.327,
                0.305,
                0.283,
                0.261,
                0.240,
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            14.9* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 72.5 ? 72.5 - 43:((metrics?.height ?? 45) - 43)),
            8.4 * ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 95 ? 95 - 42 : ((metrics?.height ?? 45) - 42)),
            9.78 * ((metrics?.height ?? 80) < 80 ? 0 : 
            (metrics?.height ?? 80) > 120 ? 120 - 76 : ((metrics?.height ?? 80) - 76))
        ]
    };
}
    
export function getHGZ(metrics: {height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/z-scores/length-height/girls/height-girls-z-0-6.png"),
            require("../../../static/images/tables/z-scores/length-height/girls/height-girls-z-0-2.png"),
            require("../../../static/images/tables/z-scores/length-height/girls/height-girls-z-2-5.png"),
        ],
        title: "Puntuaciones z de la altura",
        description: [
            "La estatura de tu hija está muy por debajo de lo esperado para su edad. Esta diferencia puede indicar que su desarrollo está yendo más lento. Consultar con un especialista es el primer paso para saber si necesita una ayuda extra en su crecimiento.",
            "Tu hija es más baja de lo habitual para su edad. Aunque puede ser algo completamente natural, conviene no dejarlo pasar. Una revisión médica puede despejar dudas y ayudarte a acompañar su crecimiento con confianza.",
            "Está un poco más bajita que otras niñas de su edad. A veces esto no significa nada serio, pero observar su progreso en el tiempo es clave. Los chequeos periódicos ayudarán a confirmar que todo está en orden.",
            "Su estatura está en el rango adecuado para su edad. Esto muestra que se está desarrollando correctamente. Una buena alimentación, descanso y juegos son fundamentales para que siga creciendo con alegría.",
            "Es apenas más alta que el promedio, lo cual es normal y saludable. Cada niña tiene su ritmo y esta diferencia no representa ningún riesgo. Acompañala como siempre con sus revisiones médicas.",
            "Tu hija tiene una estatura notablemente superior a la media para su edad. Esto puede reflejar una etapa de crecimiento acelerado. Asegúrate de que sus chequeos estén al día para confirmar que todo marcha bien.",
            "Tiene una altura muy por encima de lo habitual. Esto no significa que algo esté mal, pero sí puede influir en cómo se siente o cómo se relaciona. Apoyarla y hablar con el pediatra puede ayudarte a asegurar que todo su desarrollo sea armónico."
        ],
        
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.762,
                0.502,
                0.241
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            14.9* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 72.5 ? 72.5 - 43 :((metrics?.height ?? 45) - 43)),
            8.4* (( metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 95 ? 95 - 42 : ((metrics?.height ?? 45)  - 42)),
            9.78 * ((metrics?.height ?? 80) < 80 ? 0 : 
            (metrics?.height ?? 80) > 120 ? 120 - 76: ((metrics?.height ?? 80) - 76))
        ]
    };
}
    
export function getWBZ(metrics: {weight?: number}) {
    return {
        image: [
            require("../../../static/images/tables/z-scores/weight/boys/weight-boys-z-0-6.png"),
            require("../../../static/images/tables/z-scores/weight/boys/weight-boys-z-0-2.png"),
            require("../../../static/images/tables/z-scores/weight/boys/weight-boys-z-2-5.png"),
        ],
        title: "Puntuaciones z del peso",
        description: [
            "El peso de tu hijo está considerablemente por debajo de lo que se espera para su edad. Esto puede indicar que no está obteniendo la energía o los nutrientes necesarios para crecer con normalidad. Es muy importante actuar pronto, con el acompañamiento de su pediatra, para asegurar que reciba el apoyo nutricional y médico adecuado.",
            "Tu hijo pesa menos de lo habitual para su edad. Aunque cada niño tiene su ritmo, este valor sugiere que es conveniente prestar atención a su alimentación y estado general. Un control médico puede aclarar si es solo una etapa o si necesita algún refuerzo en su dieta.",
            "Su peso está un poco por debajo de lo común. Esto no siempre es preocupante, pero sí es bueno seguir observándolo. A veces pequeños cambios en la rutina diaria o la alimentación marcan la diferencia. Consulta con el pediatra para tener una visión más completa.",
            "Tu hijo tiene un peso acorde a su edad. Está dentro del rango saludable, lo que es una excelente noticia. Su desarrollo físico sigue un camino adecuado. Mantené sus buenos hábitos y chequeos médicos para acompañarlo en cada etapa.",
            "Su peso está ligeramente por encima del promedio, pero aún en el rango saludable. Esto puede ser totalmente normal y reflejar una buena nutrición o un crecimiento más acelerado. No hay nada de qué preocuparse si todo lo demás está en equilibrio.",
            "El peso de tu hijo es claramente más alto que el promedio para su edad. Puede deberse a su constitución o a ciertos hábitos que conviene revisar. No necesariamente es un problema, pero sí merece una mirada médica para asegurarte de que su salud está bien cuidada.",
            "Tu hijo tiene un peso bastante por encima de lo esperado para su edad. Esto puede tener distintas causas, y es clave abordarlo con apoyo profesional. Con orientación adecuada se puede lograr un equilibrio saludable y prevenir complicaciones futuras."
        ],
        
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.764,
                0.742,
                0.720,
                0.698,
                0.677,
                0.655,
                0.633,
                0.611,
                0.589,
                0.567,
                0.546,
                0.524,
                0.502,
                0.480,
                0.458,
                0.436,
                0.414,
                0.392,
                0.370,
                0.349,
                0.327,
                0.305,
                0.283,
                0.261,
                0.240,
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            49.8  * ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 10.5 ? 10.5 - 1.7 : ((metrics?.weight ?? 1) - 1.7)),
            29.2* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 15.6 ? 15.6 - 1.4 : ((metrics?.weight ?? 1) - 1.4)),
            23.89 * ((metrics?.weight ?? 8) < 8 ? 0 : 
            (metrics?.weight ?? 1) > 28 ? 28 - 8 : ((metrics?.weight ?? 8) - 8))
        ]
    };
}
    
export function getWGZ(metrics: {weight?: number}) {
    return {
        image: [
            require("../../../static/images/tables/z-scores/weight/girls/weight-girls-z-0-6.png"),
            require("../../../static/images/tables/z-scores/weight/girls/weight-girls-z-0-2.png"),
            require("../../../static/images/tables/z-scores/weight/girls/weight-girls-z-2-5.png"),
        ],
        title: "Puntuaciones z del peso",
        description: [
            "Tu hija tiene un peso muy bajo para su edad, lo cual puede afectar su crecimiento si no se interviene a tiempo. Este dato no debe alarmarte, pero sí invita a una evaluación médica. Con una atención temprana y seguimiento, se puede mejorar su nutrición y asegurar que crezca fuerte y sana.",
            "El peso de tu hija está por debajo del promedio. Esto no siempre indica un problema grave, pero sí conviene observarlo. Es buen momento para conversar con su pediatra y revisar su dieta, su energía diaria y cómo se está desarrollando.",
            "Tu hija pesa un poco menos que la mayoría de niñas de su edad. Puede ser solo su constitución, pero también es importante observar su evolución. Un control pediátrico te dará claridad y permitirá actuar si es necesario.",
            "El peso de tu hija está dentro del rango considerado saludable. Es una excelente señal de que se está desarrollando bien. Seguí acompañándola con una buena alimentación, actividades diarias y sus controles médicos.",
            "Tu hija tiene un peso apenas superior al promedio, lo cual puede ser completamente normal. A veces esto refleja una etapa de crecimiento o una contextura natural. No representa un riesgo mientras su salud general esté en equilibrio.",
            "El peso está bastante por encima del habitual para su edad. Esto puede ser parte de su genética o de hábitos diarios que conviene revisar. Consultar con un profesional puede ayudarte a equilibrar su desarrollo y evitar futuras complicaciones.",
            "Tu hija tiene un peso muy alto para su edad. Este valor merece una atención especial, ya que puede influir en otros aspectos de su salud. Con el acompañamiento adecuado, pueden tomarse medidas para promover un crecimiento saludable y lleno de bienestar."
        ],
        
        cuadrante:[
            [
                0.764,
                0.743,
                0.723,
                0.703,
                0.682,
                0.662,
                0.642,
                0.622,
                0.602,
                0.581,
                0.561,
                0.541,
                0.52,
                0.5,
                0.414,
                0.327,
                0.24,
            ],
            [
                0.762,
                0.502,
                0.241
            ],
            [
                0.764,
                0.589,
                0.415,
                0.24,
            ],
        ],
        metrica:[
            52  * ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 10.5 ? 10.5 - 1.7 : ((metrics?.weight ?? 1) - 1.7)),
            29.2* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 17.8 ? 17.8 - 1.4 : ((metrics?.weight ?? 1) - 1.4)),
            20.83 * ((metrics?.weight ?? 8) < 8 ? 0 : 
            (metrics?.weight ?? 1) > 24.6 ? 24.6 - 7 : ((metrics?.weight ?? 8) - 7))
        ]
    };
}

export function getWFHBZ(metrics: {weight?: number, height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/z-scores/weight-for-length-height/boys/weight-for-height-boys-z-0-2.png"),
            require("../../../static/images/tables/z-scores/weight-for-length-height/boys/weight-for-height-boys-z-2-5.png"),
        ],
        title: ["Puntuaciones z del peso entre la altura"],
        description: [
            "Tu hijo tiene un peso muy bajo en relación con su estatura. Esto puede ser una señal de desnutrición o de que su cuerpo no está absorbiendo los nutrientes como debería. Es esencial que lo revise un profesional para entender qué está ocurriendo y actuar cuanto antes.",
            "Pesa menos de lo esperado para su estatura. Aunque no siempre es alarmante, sí conviene investigar un poco más. Puede tratarse de una fase pasajera, pero no está de más consultar con su pediatra.",
            "Tiene un peso algo menor en comparación con su altura. Si está activo y sano, puede no representar un problema, pero seguir su evolución es clave. Un seguimiento profesional te ayudará a confirmar que todo va bien.",
            "Su peso está en equilibrio con su estatura. Esto muestra que su desarrollo físico es armónico. Está creciendo de forma saludable, lo cual es una muy buena señal. Seguimos por buen camino.",
            "Tiene un peso algo superior al esperado para su estatura. A veces esto se debe a factores familiares o hábitos cotidianos. No hay por qué alarmarse, pero sí es buena idea observar su evolución y hablar con el pediatra.",
            "Tu hijo tiene un peso bastante más alto en relación con su altura. Esto puede generar ciertas molestias físicas con el tiempo si no se equilibra. Consultar con un especialista ayudará a prevenir futuros problemas.",
            "La relación entre su peso y estatura está muy por encima de lo habitual. Esto puede estar indicando un desbalance que conviene tratar pronto. Con apoyo médico y cambios adecuados, es posible mejorar su bienestar y salud general."
        ],
        
        height:[
            11.52* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 110 ? 110 - 45: ((metrics?.height ?? 45) - 45)),
            13.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 120 ? 120 - 65: ((metrics?.height ?? 65) - 65)),
        ],
        weight:[
            19.98* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 23 ? 23 - 1: ((metrics?.weight ?? 1) - 1)),
            18.4* (( metrics?.weight ?? 5) < 5 ? 0 : 
            (metrics?.weight ?? 5) > 31 ?  31 - 5 : ((metrics?.weight ?? 5) - 5)),
        ]
    };
}

export function getWFHGZ(metrics: {weight?: number, height?: number}) {
    return {
        image: [
            require("../../../static/images/tables/z-scores/weight-for-length-height/girls/weight-for-height-girls-z-0-2.png"),
            require("../../../static/images/tables/z-scores/weight-for-length-height/girls/weight-for-height-girls-z-2-5.png"),
        ],
        title: "Puntuaciones z del peso entre la altura",
        description: [
            "El peso de tu hija es muy bajo en comparación con su altura. Esta diferencia puede afectar su energía, su sistema inmune y su desarrollo en general. Es fundamental hablar con el pediatra y entender cómo apoyarla para mejorar su estado nutricional.",
            "Pesa menos de lo que se esperaría para su estatura. No siempre es algo grave, pero sí puede ser una señal de que necesita una atención especial. Una evaluación médica puede ayudarte a tomar decisiones a tiempo.",
            "Tu hija está algo más delgada de lo que corresponde para su altura. Si se encuentra activa y con buen ánimo, no suele ser preocupante, pero seguir su progreso con controles regulares es una excelente decisión.",
            "Su peso y estatura están bien equilibrados. Esto significa que está creciendo de forma saludable. Una gran señal que refleja el buen trabajo que estás haciendo en su cuidado diario.",
            "Su peso está un poco por encima de lo que se considera ideal para su altura. No es un problema por sí mismo, pero sí es un dato que conviene observar para fomentar buenos hábitos y mantener un desarrollo armónico.",
            "La relación entre su peso y estatura es alta. Esto puede reflejar un aumento de peso mayor al ideal. No hay motivo de culpa, pero sí es buena idea revisar su alimentación y hábitos junto al pediatra.",
            "Tu hija tiene una proporción de peso muy elevada respecto a su altura. Este dato debe verse con cuidado, ya que puede repercutir en su salud física con el tiempo. Actuar ahora, con acompañamiento profesional, puede hacer una gran diferencia en su bienestar futuro."
        ],
        
        height:[
            11.52* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 110 ? 110 - 45: ((metrics?.height ?? 45) - 45)),
            13.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 120 ? 120 - 65 : ((metrics?.height ?? 65) - 65)),
        ],
        weight:[
            19.98* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 23 ? 23 - 1 : ((metrics?.weight ?? 1) - 1)),
            17.4* (( metrics?.weight ?? 5) < 5 ? 0 : 
            (metrics?.weight ?? 5) > 28 ? 28 - 4.5 : ((metrics?.weight ?? 5) - 4.5)),
        ]
    };
}