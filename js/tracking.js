// ==========================================
// FIXFLOW TRACKING SYSTEM
// ==========================================

const repairIdInput = document.getElementById("repairIdInput");
const trackButton = document.getElementById("trackButton");
const errorMessage = document.getElementById("errorMessage");
const trackingResult = document.getElementById("trackingResult");

const resultRepairId = document.getElementById("resultRepairId");
const resultStatus = document.getElementById("resultStatus");
const deviceIcon = document.getElementById("deviceIcon");
const deviceName = document.getElementById("deviceName");
const repairType = document.getElementById("repairType");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const repairCost = document.getElementById("repairCost");
const completionDate = document.getElementById("completionDate");
const technicianName = document.getElementById("technicianName");
const timelineContainer = document.getElementById("timelineContainer");


// ==========================================
// HIDE RESULT INITIALLY
// ==========================================

trackingResult.style.display = "none";


// ==========================================
// GET SAVED REPAIRS
// ==========================================

function getRepairs() {

    try {

        return JSON.parse(
            localStorage.getItem("fixflowRepairs")
        ) || [];

    } catch (error) {

        console.error(
            "Error loading repairs:",
            error
        );

        return [];

    }

}


// ==========================================
// FIND REPAIR
// ==========================================

function findRepair(repairId) {

    const repairs = getRepairs();

    return repairs.find(repair => {

        return String(repair.id || "")
            .toUpperCase() === repairId.toUpperCase();

    });

}


// ==========================================
// GET PROGRESS FROM STATUS
// ==========================================

function getProgressFromStatus(status) {

    switch (status) {

        case "Request Received":
            return 10;

        case "Diagnosis":
            return 30;

        case "Repair In Progress":
            return 60;

        case "Quality Testing":
            return 80;

        case "Ready for Pickup":
            return 100;

        case "Completed":
            return 100;

        default:
            return 10;

    }

}


// ==========================================
// DEVICE ICON
// ==========================================

function getDeviceIcon(type) {

    const deviceType =
        String(type || "").toLowerCase();


    if (
        deviceType.includes("laptop")
    ) {

        return "fa-solid fa-laptop";

    }


    if (
        deviceType.includes("mobile") ||
        deviceType.includes("phone") ||
        deviceType.includes("iphone")
    ) {

        return "fa-solid fa-mobile-screen-button";

    }


    if (
        deviceType.includes("tablet")
    ) {

        return "fa-solid fa-tablet-screen-button";

    }


    if (
        deviceType.includes("tv")
    ) {

        return "fa-solid fa-tv";

    }


    return "fa-solid fa-screwdriver-wrench";

}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(dateString) {

    if (!dateString) {

        return "Not available";

    }


    // If date is already like:
    // "22 Aug 2026"

    if (
        typeof dateString === "string" &&
        isNaN(Date.parse(dateString))
    ) {

        return dateString;

    }


    const date =
        new Date(dateString);


    if (isNaN(date.getTime())) {

        return dateString;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ==========================================
// CREATE TIMELINE
// ==========================================

function createTimeline(repair) {

    timelineContainer.innerHTML = "";


    const status =
        repair.status || "Request Received";


    const progress =
        getProgressFromStatus(status);


    // ======================================
    // TIMELINE STATUS
    // ======================================

    let requestStatus = "completed";
    let diagnosisStatus = "upcoming";
    let repairStatus = "upcoming";
    let testingStatus = "upcoming";
    let pickupStatus = "upcoming";


    if (progress >= 30) {

        diagnosisStatus = "completed";

    }


    if (progress >= 60) {

        repairStatus = "completed";

    }


    if (progress >= 80) {

        testingStatus = "completed";

    }


    if (progress >= 100) {

        pickupStatus = "completed";

    }


    // ======================================
    // ACTIVE STATUS
    // ======================================

    if (status === "Request Received") {

        requestStatus = "active";

    }

    else if (status === "Diagnosis") {

        diagnosisStatus = "active";

    }

    else if (status === "Repair In Progress") {

        repairStatus = "active";

    }

    else if (status === "Quality Testing") {

        testingStatus = "active";

    }

    else if (status === "Ready for Pickup") {

        pickupStatus = "active";

    }

    else if (status === "Completed") {

        pickupStatus = "completed";

    }


    // ======================================
    // TIMELINE DATA
    // ======================================

    const timeline = [

        {
            title: "Request Received",

            description:
                "Repair request submitted",

            status: requestStatus,

            icon:
                "fa-solid fa-check"
        },


        {
            title: "Diagnosis",

            description:
                "Technician is checking your device",

            status: diagnosisStatus,

            icon:
                "fa-solid fa-magnifying-glass"
        },


        {
            title: "Repair In Progress",

            description:
                "Repair work is being completed",

            status: repairStatus,

            icon:
                "fa-solid fa-screwdriver-wrench"
        },


        {
            title: "Quality Check",

            description:
                "Final testing of your device",

            status: testingStatus,

            icon:
                "fa-solid fa-shield-halved"
        },


        {
            title: "Ready for Pickup",

            description:
                "Your device is ready",

            status: pickupStatus,

            icon:
                "fa-solid fa-box"
        }

    ];


    // ======================================
    // CREATE TIMELINE ROWS
    // ======================================

    timeline.forEach(item => {

        const row =
            document.createElement("div");


        row.className =
            `timeline-row ${item.status}`;


        row.innerHTML = `

            <div class="timeline-marker">

                <i class="${item.icon}"></i>

            </div>


            <div class="timeline-content">

                <strong>
                    ${item.title}
                </strong>

                <span>
                    ${item.description}
                </span>

            </div>

        `;


        timelineContainer.appendChild(row);

    });

}


// ==========================================
// SHOW REPAIR
// ==========================================

function showRepair(repair) {

    errorMessage.textContent = "";


    // ======================================
    // REPAIR ID
    // ======================================

    resultRepairId.textContent =
        repair.id || "-";


    // ======================================
    // STATUS
    // ======================================

    const status =
        repair.status || "Request Received";


    resultStatus.innerHTML = `

        <span></span>

        ${status}

    `;


    // ======================================
    // DEVICE
    // ======================================

    const device =
        repair.device || {};


    const brand =
        device.brand || "Unknown";


    const type =
        device.type || "Device";


    const problem =
        device.problem || "Repair Service";


    deviceIcon.className =
        getDeviceIcon(type);


    deviceName.textContent =
        `${brand} ${type}`;


    repairType.textContent =
        problem;


    // ======================================
    // PROGRESS
    // ======================================

    const progress =
        getProgressFromStatus(status);


    progressText.textContent =
        `${progress}%`;


    progressFill.style.width =
        `${progress}%`;


    // ======================================
    // COST
    // ======================================

    let cost =
        repair.cost;


    if (cost) {

        const costString =
            String(cost);


        if (costString.includes("₹")) {

            repairCost.textContent =
                costString;

        } else {

            repairCost.textContent =
                `₹${costString}`;

        }

    } else {

        repairCost.textContent =
            "To be estimated";

    }


    // ======================================
    // COMPLETION / APPOINTMENT DATE
    // ======================================

    if (
        repair.appointment &&
        repair.appointment.date
    ) {

        completionDate.textContent =
            formatDate(
                repair.appointment.date
            );

    } else {

        completionDate.textContent =
            "To be confirmed";

    }


    // ======================================
    // TECHNICIAN
    // ======================================

    technicianName.textContent =
        repair.technician ||
        "Will be assigned";


    // ======================================
    // TIMELINE
    // ======================================

    createTimeline(repair);


    // ======================================
    // SHOW RESULT
    // ======================================

    trackingResult.style.display =
        "block";


    trackingResult.scrollIntoView({
        behavior: "smooth"
    });

}


// ==========================================
// TRACK REPAIR
// ==========================================

function trackRepair() {

    const repairId =
        repairIdInput.value
            .trim()
            .toUpperCase();


    errorMessage.textContent = "";


    // ======================================
    // EMPTY INPUT
    // ======================================

    if (!repairId) {

        errorMessage.textContent =
            "Please enter your Repair ID.";


        trackingResult.style.display =
            "none";


        return;

    }


    // ======================================
    // FIND REPAIR
    // ======================================

    const repair =
        findRepair(repairId);


    // ======================================
    // NOT FOUND
    // ======================================

    if (!repair) {

        errorMessage.textContent =
            "Repair ID not found. Please check your ID and try again.";


        trackingResult.style.display =
            "none";


        return;

    }


    // ======================================
    // SHOW REPAIR
    // ======================================

    showRepair(repair);

}


// ==========================================
// BUTTON CLICK
// ==========================================

trackButton.addEventListener(
    "click",
    trackRepair
);


// ==========================================
// ENTER KEY
// ==========================================

repairIdInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            trackRepair();

        }

    }
);


// ==========================================
// AUTO TRACK USING URL
// Example:
// track-repair.html?id=FF-6746
// ==========================================

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const urlRepairId =
    urlParams.get("id");


if (urlRepairId) {

    repairIdInput.value =
        urlRepairId;


    trackRepair();

}


// ==========================================
// REFRESH TRACKING WHEN TAB GETS FOCUS
// ==========================================

window.addEventListener(
    "focus",
    function() {

        const currentId =
            repairIdInput.value.trim();


        if (currentId) {

            const updatedRepair =
                findRepair(currentId);


            if (updatedRepair) {

                showRepair(updatedRepair);

            }

        }

    }
);