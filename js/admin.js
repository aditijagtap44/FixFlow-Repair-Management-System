// ==========================================
// FIXFLOW ADMIN DASHBOARD
// ==========================================


// ==========================================
// GET SAVED REPAIRS
// ==========================================

let repairs =
    JSON.parse(
        localStorage.getItem("fixflowRepairs")
    ) || [];


// ==========================================
// ELEMENTS
// ==========================================

const requestsContainer =
    document.getElementById(
        "requestsContainer"
    );

const totalRequests =
    document.getElementById(
        "totalRequests"
    );

const pendingRequests =
    document.getElementById(
        "pendingRequests"
    );

const inProgressRequests =
    document.getElementById(
        "inProgressRequests"
    );

const completedRequests =
    document.getElementById(
        "completedRequests"
    );

const requestCount =
    document.getElementById(
        "requestCount"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const currentDate =
    document.getElementById(
        "currentDate"
    );


// ==========================================
// MODAL ELEMENTS
// ==========================================

const statusModal =
    document.getElementById(
        "statusModal"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const modalRepairId =
    document.getElementById(
        "modalRepairId"
    );

const newStatus =
    document.getElementById(
        "newStatus"
    );

const technicianInput =
    document.getElementById(
        "technicianInput"
    );

const costInput =
    document.getElementById(
        "costInput"
    );

const saveStatus =
    document.getElementById(
        "saveStatus"
    );


// ==========================================
// SELECTED REPAIR
// ==========================================

let selectedRepairId = null;


// ==========================================
// SAFE VALUE HELPER
// ==========================================

function getSafeValue(value, fallback = "") {

    if (
        value === null ||
        value === undefined
    ) {
        return fallback;
    }


    // Normal string or number
    if (
        typeof value === "string" ||
        typeof value === "number"
    ) {
        return String(value);
    }


    // Object
    if (
        typeof value === "object"
    ) {

        // Try common properties
        const possibleValues = [
            value.name,
            value.fullName,
            value.customerName,
            value.value,
            value.text,
            value.label,
            value.title,
            value.type,
            value.brand,
            value.problem,
            value.service,
            value.serviceName,
            value.date,
            value.time
        ];


        for (
            const item of possibleValues
        ) {

            if (
                item !== null &&
                item !== undefined &&
                typeof item !== "object" &&
                String(item).trim() !== ""
            ) {

                return String(item);

            }

        }

    }


    return fallback;

}


// ==========================================
// CUSTOMER NAME
// ==========================================

function getCustomerName(repair) {

    const customer =
        repair?.customer;


    if (
        typeof customer === "string"
    ) {

        return customer;

    }


    if (
        customer &&
        typeof customer === "object"
    ) {

        return getSafeValue(
            customer.name ||
            customer.fullName ||
            customer.customerName,
            "Customer"
        );

    }


    return "Customer";

}


// ==========================================
// CUSTOMER PHONE
// ==========================================

function getCustomerPhone(repair) {

    const customer =
        repair?.customer;


    if (
        typeof customer === "string"
    ) {

        return "Not provided";

    }


    if (
        customer &&
        typeof customer === "object"
    ) {

        return getSafeValue(
            customer.phone ||
            customer.mobile ||
            customer.phoneNumber,
            "Not provided"
        );

    }


    return "Not provided";

}


// ==========================================
// DEVICE NAME
// ==========================================

function getDeviceName(repair) {

    const device =
        repair?.device;


    if (
        !device
    ) {

        return "Device";

    }


    if (
        typeof device === "string"
    ) {

        return device;

    }


    const brand =
        getSafeValue(
            device.brand,
            ""
        );


    const type =
        getSafeValue(
            device.type ||
            device.name ||
            device.deviceName,
            ""
        );


    const fullDevice =
        `${brand} ${type}`.trim();


    return fullDevice ||
        "Device";

}


// ==========================================
// DEVICE PROBLEM
// ==========================================

function getDeviceProblem(repair) {

    const device =
        repair?.device;


    if (
        !device
    ) {

        return "Problem not specified";

    }


    if (
        typeof device === "string"
    ) {

        return device;

    }


    return getSafeValue(
        device.problem ||
        device.issue ||
        device.description,
        "Problem not specified"
    );

}


// ==========================================
// SERVICE NAME
// ==========================================

function getServiceName(repair) {

    return getSafeValue(
        repair?.service ||
        repair?.serviceName ||
        repair?.repairService,
        "Repair Service"
    );

}


// ==========================================
// APPOINTMENT DATE
// ==========================================

function getAppointmentDate(repair) {

    const appointment =
        repair?.appointment;


    if (
        !appointment
    ) {

        return "Not scheduled";

    }


    if (
        typeof appointment === "string"
    ) {

        return formatDate(
            appointment
        );

    }


    return formatDate(
        getSafeValue(
            appointment.date ||
            appointment.appointmentDate,
            ""
        )
    );

}


// ==========================================
// APPOINTMENT TIME
// ==========================================

function getAppointmentTime(repair) {

    const appointment =
        repair?.appointment;


    if (
        !appointment
    ) {

        return "Not scheduled";

    }


    if (
        typeof appointment === "string"
    ) {

        return "Not scheduled";

    }


    return getSafeValue(
        appointment.time,
        "Not scheduled"
    );

}


// ==========================================
// TECHNICIAN
// ==========================================

function getTechnician(repair) {

    return getSafeValue(
        repair?.technician ||
        repair?.technicianName,
        "Not assigned"
    );

}


// ==========================================
// COST
// ==========================================

function getCost(repair) {

    return getSafeValue(
        repair?.cost ||
        repair?.estimatedCost,
        "Not estimated"
    );

}


// ==========================================
// CURRENT DATE
// ==========================================

function showCurrentDate() {

    const today =
        new Date();


    if (
        currentDate
    ) {

        currentDate.textContent =
            today.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }

}


// ==========================================
// UPDATE STATISTICS
// ==========================================

function updateStatistics() {

    if (totalRequests) {

        totalRequests.textContent =
            repairs.length;

    }


    const pending =
        repairs.filter(
            repair =>
                repair.status ===
                "Request Received"
        );


    const inProgress =
        repairs.filter(
            repair =>
                [
                    "Diagnosis",
                    "Repair In Progress",
                    "Quality Testing"
                ].includes(
                    repair.status
                )
        );


    const completed =
        repairs.filter(
            repair =>
                repair.status ===
                "Completed"
        );


    if (pendingRequests) {

        pendingRequests.textContent =
            pending.length;

    }


    if (inProgressRequests) {

        inProgressRequests.textContent =
            inProgress.length;

    }


    if (completedRequests) {

        completedRequests.textContent =
            completed.length;

    }

}


// ==========================================
// STATUS CLASS
// ==========================================

function getStatusClass(status) {

    switch (status) {

        case "Request Received":
            return "received";

        case "Diagnosis":
            return "diagnosis";

        case "Repair In Progress":
            return "progress";

        case "Quality Testing":
            return "testing";

        case "Ready for Pickup":
            return "ready";

        case "Completed":
            return "completed";

        default:
            return "received";

    }

}


// ==========================================
// DISPLAY REQUESTS
// ==========================================

function displayRequests() {

    if (
        !requestsContainer
    ) {

        return;

    }


    const searchText =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const filteredRepairs =
        repairs.filter(
            repair => {

                const customerName =
                    getCustomerName(
                        repair
                    );


                const phone =
                    getCustomerPhone(
                        repair
                    );


                const device =
                    getDeviceName(
                        repair
                    );


                const problem =
                    getDeviceProblem(
                        repair
                    );


                const service =
                    getServiceName(
                        repair
                    );


                const repairId =
                    getSafeValue(
                        repair.id,
                        ""
                    );


                const searchableText =
                    `
                    ${customerName}
                    ${phone}
                    ${device}
                    ${problem}
                    ${service}
                    ${repairId}
                    `
                        .toLowerCase();


                const matchesSearch =
                    searchableText.includes(
                        searchText
                    );


                const matchesStatus =
                    selectedStatus === "all" ||
                    repair.status ===
                        selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    if (requestCount) {

        requestCount.textContent =
            `${filteredRepairs.length} request${
                filteredRepairs.length !== 1
                    ? "s"
                    : ""
            }`;

    }


    requestsContainer.innerHTML =
        "";


    if (
        filteredRepairs.length === 0
    ) {

        requestsContainer.innerHTML = `

            <div class="admin-empty">

                <i class="fa-solid fa-inbox"></i>

                <h3>
                    No Repair Requests
                </h3>

                <p>
                    No repair requests match your search.
                </p>

            </div>

        `;

        return;

    }


    filteredRepairs
        .slice()
        .reverse()
        .forEach(
            repair => {

                createRepairCard(
                    repair
                );

            }
        );

}


// ==========================================
// CREATE REPAIR CARD
// ==========================================

function createRepairCard(
    repair
) {

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "request-card";


    // Get safe values

    const customerName =
        getCustomerName(
            repair
        );


    const phone =
        getCustomerPhone(
            repair
        );


    const deviceName =
        getDeviceName(
            repair
        );


    const problem =
        getDeviceProblem(
            repair
        );


    const service =
        getServiceName(
            repair
        );


    const appointmentDate =
        getAppointmentDate(
            repair
        );


    const appointmentTime =
        getAppointmentTime(
            repair
        );


    const technician =
        getTechnician(
            repair
        );


    const cost =
        getCost(
            repair
        );


    const status =
        getSafeValue(
            repair.status,
            "Request Received"
        );


    const repairId =
        getSafeValue(
            repair.id,
            "Unknown"
        );


    const initials =
        getInitials(
            customerName
        );


    card.innerHTML = `

        <div class="request-card-top">

            <div class="customer-info">

                <div class="customer-avatar">

                    ${initials}

                </div>


                <div>

                    <h3>
                        ${customerName}
                    </h3>

                    <p>
                        ${phone}
                    </p>

                </div>

            </div>


            <span class="request-id">

                ${repairId}

            </span>

        </div>


        <div class="request-card-body">


            <div class="request-detail">

                <span>
                    DEVICE
                </span>

                <strong>
                    ${deviceName}
                </strong>

            </div>


            <div class="request-detail">

                <span>
                    PROBLEM
                </span>

                <strong>
                    ${problem}
                </strong>

            </div>


            <div class="request-detail">

                <span>
                    SERVICE
                </span>

                <strong>
                    ${service}
                </strong>

            </div>


            <div class="request-detail">

                <span>
                    APPOINTMENT
                </span>

                <strong>
                    ${appointmentDate}
                </strong>

            </div>


            <div class="request-detail">

                <span>
                    TIME
                </span>

                <strong>
                    ${appointmentTime}
                </strong>

            </div>


            <div class="request-detail">

                <span>
                    TECHNICIAN
                </span>

                <strong>
                    ${technician}
                </strong>

            </div>


        </div>


        <div class="request-card-bottom">


            <div>

                <span
                    class="request-status ${getStatusClass(status)}"
                >

                    <i class="fa-solid fa-circle"></i>

                    ${status}

                </span>


                <div
                    style="
                        margin-top: 7px;
                        color: #64748b;
                        font-size: 12px;
                    "
                >

                    Estimated Cost:

                    <strong>
                        ${cost}
                    </strong>

                </div>

            </div>


            <div class="request-actions">

                <a
                    class="view-btn"
                    href="track-repair.html"
                    title="Track this repair"
                >

                    <i
                        class="fa-solid fa-location-dot"
                    ></i>

                    Track

                </a>


                <button
                    class="update-btn"
                    onclick="openUpdateModal('${repairId}')"
                >

                    <i
                        class="fa-solid fa-pen"
                    ></i>

                    Update

                </button>

            </div>

        </div>

    `;


    requestsContainer.appendChild(
        card
    );

}


// ==========================================
// OPEN UPDATE MODAL
// ==========================================

function openUpdateModal(
    repairId
) {

    const repair =
        repairs.find(
            item =>
                item.id ===
                repairId
        );


    if (!repair) {

        return;

    }


    selectedRepairId =
        repairId;


    if (modalRepairId) {

        modalRepairId.textContent =
            repair.id;

    }


    if (newStatus) {

        newStatus.value =
            getSafeValue(
                repair.status,
                "Request Received"
            );

    }


    if (technicianInput) {

        technicianInput.value =
            getTechnician(
                repair
            ) === "Not assigned"
                ? ""
                : getTechnician(
                    repair
                );

    }


    if (costInput) {

        costInput.value =
            getCost(
                repair
            ) === "Not estimated"
                ? ""
                : getCost(
                    repair
                );

    }


    if (statusModal) {

        statusModal.classList.add(
            "show"
        );

    }

}


// ==========================================
// CLOSE UPDATE MODAL
// ==========================================

function closeUpdateModal() {

    if (statusModal) {

        statusModal.classList.remove(
            "show"
        );

    }


    selectedRepairId =
        null;

}


// ==========================================
// SAVE STATUS
// ==========================================

function saveRepairChanges() {

    if (
        !selectedRepairId
    ) {

        return;

    }


    const repair =
        repairs.find(
            item =>
                item.id ===
                selectedRepairId
        );


    if (!repair) {

        return;

    }


    if (newStatus) {

        repair.status =
            newStatus.value;

    }


    if (technicianInput) {

        repair.technician =
            technicianInput.value
                .trim() ||
            "Not assigned";

    }


    if (costInput) {

        repair.cost =
            costInput.value
                .trim() ||
            "To be estimated";

    }


    localStorage.setItem(
        "fixflowRepairs",
        JSON.stringify(
            repairs
        )
    );


    updateStatistics();

    displayRequests();

    closeUpdateModal();

}


// ==========================================
// GET INITIALS
// ==========================================

function getInitials(
    name
) {

    const safeName =
        getSafeValue(
            name,
            "Customer"
        );


    return safeName
        .split(" ")
        .filter(
            word =>
                word.trim() !== ""
        )
        .map(
            word =>
                word.charAt(0)
        )
        .join("")
        .substring(0, 2)
        .toUpperCase();

}


// ==========================================
// FORMAT DATE
// ==========================================

function formatDate(
    dateString
) {

    if (
        !dateString
    ) {

        return "Not scheduled";

    }


    // If an object accidentally reaches here
    if (
        typeof dateString ===
        "object"
    ) {

        dateString =
            getSafeValue(
                dateString.date ||
                dateString.value ||
                dateString.text,
                ""
            );

    }


    if (
        !dateString
    ) {

        return "Not scheduled";

    }


    const date =
        new Date(
            String(dateString)
                .replace(
                    /T.*$/,
                    ""
                ) +
            "T00:00:00"
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return getSafeValue(
            dateString,
            "Not scheduled"
        );

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
// SEARCH
// ==========================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        displayRequests
    );

}


// ==========================================
// FILTER
// ==========================================

if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        displayRequests
    );

}


// ==========================================
// MODAL EVENTS
// ==========================================

if (closeModal) {

    closeModal.addEventListener(
        "click",
        closeUpdateModal
    );

}


if (saveStatus) {

    saveStatus.addEventListener(
        "click",
        saveRepairChanges
    );

}


if (statusModal) {

    statusModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                statusModal
            ) {

                closeUpdateModal();

            }

        }
    );

}


// ==========================================
// ADMIN LOGOUT
// ==========================================

const adminLogout =
    document.getElementById(
        "adminLogout"
    );


if (adminLogout) {

    adminLogout.addEventListener(
        "click",
        function () {

            sessionStorage.removeItem(
                "fixflowAdminLoggedIn"
            );


            window.location.href =
                "admin-login.html";

        }
    );

}


// ==========================================
// INITIALIZE
// ==========================================

showCurrentDate();

updateStatistics();

displayRequests();