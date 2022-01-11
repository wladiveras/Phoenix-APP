import { ref, reactive } from "vue"

export const products = ref([
    {
        id: 1,
        checked: false,
        model: "card",
        name: "Cartão PVC",
        description: "Crachá, Carteirinha ou Cartão em Geral",
    },
    {
        id: 2,
        checked: false,
        model: "cord",
        name: "Cordão",
        description: "Cordão para Crachá Personalizado",
    },

    {
        id: 3,
        checked: false,
        model: "roller",
        name: "Roller Clips",
        description: "Roller clip para crachá personalizado",
    },
    {
        id: 4,
        checked: false,
        model: "mask",
        name: "Mascaras",
        description: "Mascara de proteção personalizada",
    },
    {
        id: 5,
        checked: false,
        model: "cred",
        name: "Credencial",
        description: "Credencial personalizada",
    },
])

// Product Selection
export const cardOption = {
    input: [
        {
            value: 0,
            name: "print",
            placeholder: "Tipo de Impressão",
            options: [
                {
                    value: 1,
                    text: "Impressão 0/0",
                },
                {
                    value: 2,
                    text: "Impressão 4/0",
                },
                {
                    value: 3,
                    text: "Impressão 4/1",
                },
                {
                    value: 4,
                    text: "Impressão 4/4",
                },
            ],
        },
        {
            value: 0,
            name: "hole",
            placeholder: "Escolha Tipos de Furo",
            options: [
                {
                    value: 1,
                    text: "Sem Furo",
                },
                {
                    value: 2,
                    text: "Redondo",
                },
                {
                    value: 3,
                    text: "Ovoide",
                },
            ],
        },
        {
            value: 0,
            name: "chip",
            placeholder: "Selecione a Tecnologia",
            options: [
                {
                    value: 1,
                    text: "Sem CHIP",
                },
                {
                    value: 2,
                    text: "Chip 13,56",
                },
                {
                    value: 3,
                    text: "Chip 125",
                },
            ],
        },
    ],
}

export const cordOption = {
    input: [
        {
            value: 0,
            name: "depth",
            placeholder: "Selecione a Espessura",
            options: [
                {
                    value: 1,
                    text: "12 milimetros",
                },
                {
                    value: 2,
                    text: "15 milimetros",
                },
                {
                    value: 3,
                    text: "20 milimetros",
                },
                {
                    value: 4,
                    text: "25 milimetros",
                },
            ],
        },
        {
            value: 0,
            name: "closure",
            placeholder: "Selecione o Fechamento",
            options: [
                {
                    value: 1,
                    text: "Sem Fechamento",
                },
                {
                    value: 2,
                    text: "Costurado",
                },
                {
                    value: 3,
                    text: "Metálico",
                },
            ],
        },
        {
            value: 0,
            name: "finishing",
            placeholder: "Acabamento",
            options: [
                {
                    value: 1,
                    text: "Sem Jacaré",
                },
                {
                    value: 2,
                    text: "Argola",
                },
                {
                    value: 3,
                    text: "Jacaré",
                },
                {
                    value: 4,
                    text: "Mosquete",
                },
                {
                    value: 5,
                    text: "Jacaré de Plastico",
                },
            ],
        },
    ],
}

export const rollerOption = {
    input: [
        {
            value: 0,
            name: "color",
            placeholder: "Selecione a Cor",
            options: [
                {
                    value: 1,
                    text: "Branco",
                },
                {
                    value: 2,
                    text: "Preto",
                },
                {
                    value: 3,
                    text: "Azul",
                },
                {
                    value: 4,
                    text: "Cinza",
                },
                {
                    value: 5,
                    text: "Vermelho",
                },
                {
                    value: 6,
                    text: "Verde",
                },
                {
                    value: 7,
                    text: "Outro",
                },
            ],
        },
        {
            value: 0,
            name: "finishing",
            placeholder: "Selecione o Acabamento",
            options: [
                {
                    value: 1,
                    text: "Personalizado",
                },
                {
                    value: 2,
                    text: "Liso",
                },
            ],
        },
    ],
}

export const maskOption = {
    input: [
        {
            value: 0,
            name: "size",
            placeholder: "Selecione o Tamanho",
            options: [
                {
                    value: 1,
                    text: "Unico",
                },
                {
                    value: 2,
                    text: "Pequeno",
                },
            ],
        },
        {
            value: 0,
            name: "color",
            placeholder: "Selecione a cor do Elastico",
            options: [
                {
                    value: 1,
                    text: "Branco",
                },
                {
                    value: 2,
                    text: "Preto",
                },
            ],
        },
    ],
}

export const credOption = {
    input: [
        {
            value: 0,
            name: "print",
            placeholder: "Tipo de Impressão",
            options: [
                {
                    value: 1,
                    text: "Impressão 4/0",
                },
                {
                    value: 2,
                    text: "Impressão 4/1",
                },
                {
                    value: 3,
                    text: "Impressão 4/4",
                },
            ],
        },
        {
            value: 0,
            name: "hole",
            placeholder: "Escolha Tipos de Furo",
            options: [
                {
                    value: 1,
                    text: "Sem Furo",
                },
                {
                    value: 2,
                    text: "Redondo",
                },
                {
                    value: 3,
                    text: "Ovoide",
                },
            ],
        },
        {
            value: 0,
            name: "size",
            placeholder: "Selecione o Tamanho",
            options: [
                {
                    value: 1,
                    text: "10x15",
                },
                {
                    value: 2,
                    text: "12x8",
                },
            ],
        },
    ],
}
