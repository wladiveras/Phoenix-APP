import { reactive } from "vue"

export const tasks = reactive([
    {
        id: "1",
        title: "#3843 - Donlee seguros",
        state: "new",
        dueDate: "6",
        participants: [
            {
                color: "warning",
                picture: "/demo/avatars/7.jpg",
            },
        ],
    },
    {
        id: "2",
        title: "#3843 - Donlee seguros",
        state: "new",
        dueDate: "6",
        participants: [
            {
                color: "info",
                picture: "/demo/avatars/8.jpg",
            },
        ],
    },
    {
        id: "3",
        title: "#3843 - Donlee seguros",
        state: "progress",
        dueDate: "6",
        cardsCount: "42",
        cardsLimit: "220",
        participants: [
            {
                color: "danger",
                picture: "/demo/avatars/12.jpg",
            },
        ],
    },
    {
        id: "4",
        title: "#3843 - Donlee seguros",
        state: "progress",
        dueDate: "6",
        cardsCount: "2",
        cardsLimit: "9",
        participants: [
            {
                color: "success",
                picture: "/demo/avatars/13.jpg",
            },
        ],
    },
    {
        id: "5",
        title: "#3843 - Donlee seguros",
        state: "progress",
        dueDate: "6",
        cardsCount: "25",
        cardsLimit: "50",
        participants: [
            {
                color: "info",
                picture: "/demo/avatars/16.jpg",
            },
        ],
    },
    {
        id: "6",
        title: "#3843 - Donlee seguros",
        state: "production",
        dueDate: "2 days",
        participants: [
            {
                color: "warning",
                picture: "/demo/avatars/8.jpg",
            },
        ],
    },
    {
        id: "7",
        title: "#3843 - Donlee seguros",
        state: "completed",
        dueDate: "Concluido",
        participants: [
            {
                color: "success",
                picture: "/demo/avatars/12.jpg",
            },
        ],
    },
    {
        id: "8",
        title: "#3843 - Donlee seguros",
        state: "completed",
        dueDate: "Concluido",
        participants: [
            {
                color: "danger",
                picture: "/demo/avatars/18.jpg",
            },
        ],
    },
    {
        id: "9",
        title: "#3843 - Donlee seguros",
        state: "completed",
        dueDate: "Concluido",
        participants: [
            {
                color: "primary",
                picture: "/demo/avatars/13.jpg",
            },
        ],
    },
    {
        id: "10",
        title: "#3843 - Donlee seguros",
        state: "completed",
        dueDate: "Concluido",
        participants: [
            {
                color: "warning",
                picture: "/demo/avatars/16.jpg",
            },
        ],
    },
    {
        id: "11",
        title: "#3843 - Donlee seguros",
        state: "shipping",
        dueDate: "Concluido",
        participants: [
            {
                color: "warning",
                picture: "/demo/avatars/16.jpg",
            },
        ],
    },
])
