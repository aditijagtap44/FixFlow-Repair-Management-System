// ==========================================
// FIXFLOW CUSTOMER DASHBOARD
// ==========================================


// ==========================================
// GET SAVED REPAIRS
// ==========================================

const repairs =
    JSON.parse(
        localStorage.getItem(
            "fixflowRepairs"
        )
    ) || [];


// ==========================================
// ELEMENTS
// ==========================================

const totalRepairs =
    document.getElementById(
        "totalRepairs"
    );

const activeRepairs =
    document.getElementById(
        "activeRepairs"
    );

const completedRepairs =
    document.getElementById(
        "completedRepairs"
    );

const upcomingRepairs =
    document.getElementById(
        "upcomingRepairs"
    );

const customerName =
    document.getElementById(
        "customerName"
    );

const activeRepairContainer =
    document.getElementById(
        "activeRepairContainer"
    );

const repairsContainer =
    document.getElementById(
        "repairsContainer"
    );


// ==========================================
// CUSTOMER NAME
// ==========================================

if (repairs.length > 0) {

    customerName.textContent =
        repairs[0].customer.name;

}


// ==========================================
// STATS
// ==========================================

totalRepairs.textContent =
    repairs.length;


const active =
    repairs.filter(
        repair =>
            repair.status !== "Completed"
    );


const completed =
    repairs.filter(
        repair =>
            repair.status === "Completed"
    );


activeRepairs.textContent =
    active.length;


completedRepairs.textContent =
    completed.length;


upcomingRepairs.textContent =
    repairs.filter(
        repair =>
            repair.appointment &&
            repair.appointment.date
    ).length;


// ==========================================
// ACTIVE REPAIR
// ==========================================

if (active.length > 0) {

    const repair =
        active[active.length - 1];


    activeRepairContainer.innerHTML = `

        <div class="active-repair-card">

            <div class="repair-device-icon">

                <i class="fa-solid fa-screwdriver-wrench"></i>

            </div>


            <div class="active-repair-info">

                <h3>
                    ${repair.device.brand}
                    ${repair.device.type}
                </h3>

                <p>
                    ${repair.device.problem}
                </p>


                <div class="progress-wrapper">

                    <div class="progress-label">

                        <span>
                            Repair Progress
                        </span>

                        <strong>
                            10%
                        </strong>

                    </div>


                    <div class="progress-bar">

                        <div
                            class="progress-fill"
                            style="width: 10%"
                        ></div>

                    </div>

                </div>

            </div>


            <div class="repair-status">

                <span class="status-badge">
                    Request Received
                </span>

                <a
                    href="track-repair.html"
                >
                    ${repair.id}
                    →
                </a>

            </div>

        </div>

    `;

}
else {

    activeRepairContainer.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-screwdriver-wrench"></i>

            <h3>
                No Active Repairs
            </h3>

            <p>
                You don't have any active repair requests.
            </p>

        </div>

    `;

}


// ==========================================
// REPAIR HISTORY
// ==========================================

if (repairs.length > 0) {

    repairsContainer.innerHTML = "";


    repairs
        .slice()
        .reverse()
        .forEach(
            repair => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "repair-card";


                card.innerHTML = `

                    <div class="repair-card-top">

                        <div>

                            <h3>
                                ${repair.device.brand}
                                ${repair.device.type}
                            </h3>

                            <p>
                                ${repair.device.problem}
                            </p>

                        </div>


                        <span class="repair-id">

                            ${repair.id}

                        </span>

                    </div>


                    <div class="repair-details">


                        <div class="detail-item">

                            <span>
                                Status
                            </span>

                            <strong>
                                ${repair.status}
                            </strong>

                        </div>


                        <div class="detail-item">

                            <span>
                                Appointment
                            </span>

                            <strong>
                                ${formatDate(
                                    repair.appointment.date
                                )}
                            </strong>

                        </div>


                        <div class="detail-item">

                            <span>
                                Time
                            </span>

                            <strong>
                                ${repair.appointment.time}
                            </strong>

                        </div>


                        <div class="detail-item">

                            <span>
                                Repair ID
                            </span>

                            <strong>
                                ${repair.id}
                            </strong>

                        </div>


                    </div>

                `;


                repairsContainer.appendChild(
                    card
                );

            }
        );

}
else {

    repairsContainer.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-folder-open"></i>

            <h3>
                No Repair History
            </h3>

            <p>
                Your repair requests will appear here.
            </p>

        </div>

    `;

}


// ==========================================
// DATE FORMAT
// ==========================================

function formatDate(dateString) {

    if (!dateString) {

        return "Not scheduled";

    }


    const date =
        new Date(
            dateString + "T00:00:00"
        );


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}