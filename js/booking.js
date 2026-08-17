// ==========================================
// FIXFLOW BOOKING SYSTEM
// ==========================================

const repairForm = document.getElementById("repairForm");
const successOverlay = document.getElementById("successOverlay");
const generatedRepairId = document.getElementById("generatedRepairId");
const closeModal = document.getElementById("closeModal");


// ==========================================
// DATE
// ==========================================

const dateInput = document.getElementById("date");

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

dateInput.min = `${year}-${month}-${day}`;


// ==========================================
// GENERATE UNIQUE REPAIR ID
// ==========================================

function generateRepairId() {

    let repairs =
        JSON.parse(
            localStorage.getItem("fixflowRepairs")
        ) || [];

    let repairId;

    do {

        const randomNumber =
            Math.floor(
                1000 + Math.random() * 9000
            );

        repairId = `FF-${randomNumber}`;

    } while (
        repairs.some(
            repair => repair.id === repairId
        )
    );

    return repairId;
}


// ==========================================
// FORM SUBMIT
// ==========================================

repairForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // ================= GET VALUES =================

        const name =
            document.getElementById("name")
                .value
                .trim();

        const phone =
            document.getElementById("phone")
                .value
                .trim();

        const email =
            document.getElementById("email")
                .value
                .trim();

        const deviceType =
            document.getElementById("deviceType")
                .value;

        const brand =
            document.getElementById("brand")
                .value
                .trim();

        const problem =
            document.getElementById("problem")
                .value
                .trim();

        const date =
            document.getElementById("date")
                .value;

        const time =
            document.getElementById("time")
                .value;

        const address =
            document.getElementById("address")
                .value
                .trim();


        // ================= PHONE VALIDATION =================

        const phonePattern =
            /^[6-9]\d{9}$/;

        if (!phonePattern.test(phone)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;
        }


        // ================= REPAIR ID =================

        const repairId =
            generateRepairId();


        // ================= REPAIR OBJECT =================

        const repairRequest = {

            id: repairId,

            customer: {

                name: name,

                phone: phone,

                email: email

            },

            device: {

                type: deviceType,

                brand: brand,

                problem: problem

            },

            appointment: {

                date: date,

                time: time

            },

            address: address,

            status: "Request Received",

            progress: 10,

            createdAt:
                new Date().toISOString()

        };


        // ==========================================
        // GET EXISTING REPAIRS
        // ==========================================

        const existingRepairs =
            JSON.parse(
                localStorage.getItem(
                    "fixflowRepairs"
                )
            ) || [];


        // ==========================================
        // ADD NEW REPAIR
        // ==========================================

        existingRepairs.push(
            repairRequest
        );


        // ==========================================
        // SAVE
        // ==========================================

        localStorage.setItem(
            "fixflowRepairs",
            JSON.stringify(
                existingRepairs
            )
        );


        // ==========================================
        // SAVE LAST CREATED REPAIR
        // ==========================================

        localStorage.setItem(
            "fixflowLastRepairId",
            repairId
        );


        // ==========================================
        // SHOW SUCCESS POPUP
        // ==========================================

        generatedRepairId.textContent =
            repairId;

        successOverlay.classList.add(
            "show"
        );


        // Reset form

        repairForm.reset();

    }
);


// ==========================================
// CLOSE MODAL
// ==========================================

closeModal.addEventListener(
    "click",
    function () {

        successOverlay.classList.remove(
            "show"
        );

    }
);


// ==========================================
// CLICK OUTSIDE MODAL
// ==========================================

successOverlay.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            successOverlay
        ) {

            successOverlay.classList.remove(
                "show"
            );

        }

    }
);