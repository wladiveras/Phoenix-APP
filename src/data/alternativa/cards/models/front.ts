import { ref, reactive } from "vue"

export const frontModel = {
    rotate: false,
    data: {
        background: {
            center: true,
            style: {
                borderRadius: "10px",
                border: "#000 0.1mm solid",

                top: "130px",
                left: "0px",

                width: "100px",
                height: "100px",
            },
        },

        avatar: {
            center: true,
            style: {
                borderRadius: "10px",
                border: "#000 0.1mm solid",

                top: "130px",
                left: "0px",

                width: "100px",
                height: "100px",
            },
        },
        name: {
            center: true,

            style: {
                top: "170px",
                left: "0px",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#fff",
            },
        },
        function: {
            center: true,
            style: {
                top: "170px",
                left: "0px",
                fontSize: "15px",
                fontWeight: "",
                color: "#fff",
            },
        },
    },
}
