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
            20.4*(2*((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 43.5 ? 43.5 : (metrics?.headCircumference ?? 31.5)- 31.5)),
            12*(2*((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 52 ? 52 : (metrics?.headCircumference ?? 31.5)- 31.5)),
            21.8*((metrics?.headCircumference ?? 32) < 32 ? 0 :
            (metrics?.headCircumference ?? 32) > 54.5 ? 54 : (metrics?.headCircumference ?? 32)- 32),
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
            (metrics?.headCircumference ?? 31.5) > 42.5 ? 42.5 : (metrics?.headCircumference ?? 31.5) - 31),
            24*(((metrics?.headCircumference ?? 31.5) < 31.5 ? 0 :
            (metrics?.headCircumference ?? 31.5) > 51 ? 51 : (metrics?.headCircumference ?? 31.5) - 30.5)),
            21.8*((metrics?.headCircumference ?? 32) < 32 ? 0 :
            (metrics?.headCircumference ?? 32) > 53.5 ? 53.5 : (metrics?.headCircumference ?? 32)- 32),
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
            (metrics?.height ?? 45) > 72.5 ? 72.5 :((metrics?.height ?? 45) - 45)),
            9.55* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 95 ? 95 : ((metrics?.height ?? 45) - 45)),
            12 * ((metrics?.height ?? 80) < 80 ? 0 : 
            (metrics?.height ?? 80) > 120 ? 120 : ((metrics?.height ?? 80) - 80))
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
            (metrics?.height ?? 45) > 72.5 ? 72.5 :((metrics?.height ?? 45) - 45)),
            9.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 95 ? 95 : ((metrics?.height ?? 45)  - 45)),
            12 * ((metrics?.height ?? 80) < 80 ? 0 : 
            (metrics?.height ?? 80) > 120 ? 120 : ((metrics?.height ?? 80) - 80))
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
            (metrics?.weight ?? 1) > 10.5 ? 10.5 : ((metrics?.weight ?? 1) - 1.75)),
            30.4* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 16.5 ? 16.5 : ((metrics?.weight ?? 1) - 1)),
            29.83 * ((metrics?.weight ?? 8) < 8 ? 0 : 
            (metrics?.weight ?? 1) > 24.5 ? 24.5 : ((metrics?.weight ?? 8) - 8.5))
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
            (metrics?.weight ?? 1) > 10.5 ? 10.5 : ((metrics?.weight ?? 1) - 1.75)),
            32.6* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 15.5 ? 15.5 : ((metrics?.weight ?? 1) - 1)),
            28.83 * ((metrics?.weight ?? 8) < 8 ? 0 : 
            (metrics?.weight ?? 1) > 25.5 ? 25.5 : ((metrics?.weight ?? 8) - 8.5))
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
            (metrics?.height ?? 45) > 110 ? 110 : ((metrics?.height ?? 45) - 45)),
            13.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 120 ? 120 : ((metrics?.height ?? 65) - 65)),
        ],
        weight:[
            21.8* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 23 ? 23 : ((metrics?.weight ?? 1) - 1)),
            20.8* ((metrics?.weight ?? 5) < 5 ? 0 : 
            (metrics?.weight ?? 5) > 28 ? 28 : ((metrics?.weight ?? 5) - 5)),
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
            (metrics?.height ?? 45) > 110 ? 110 : ((metrics?.height ?? 45) - 45)),
            13.6* ((metrics?.height ?? 45) < 45 ? 0 : 
            (metrics?.height ?? 45) > 120 ? 120 : ((metrics?.height ?? 65) - 65)),
        ],
        weight:[
            21.8* ((metrics?.weight ?? 1) < 1 ? 0 : 
            (metrics?.weight ?? 1) > 23 ? 23 : ((metrics?.weight ?? 1) - 1)),
            20.8* ((metrics?.weight ?? 5) < 5 ? 0 : 
            (metrics?.weight ?? 5) > 28 ? 28 : ((metrics?.weight ?? 5) - 5)),
        ]
    };
}