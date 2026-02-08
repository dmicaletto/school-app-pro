export const TIMETABLE = {
    lun: ["Latino", "Matematica", "Matematica", "Inglese", "Italiano"],
    mar: ["Italiano", "Motoria", "Matematica", "Matematica", "Italiano", "Scienze"],
    mer: ["Inglese", "Latino", "Italiano", "Arte", "Matematica"],
    gio: ["Scienze", "Italiano", "Italiano", "Religione", "Matematica", "Arte"],
    ven: ["Latino", "Matematica", "Italiano", "Inglese", "Motoria"]
};

// Map date-fns output (lun, mar...) to keys above if mismatch occurs.
// Date-fns 'it' locale produces: lun, mar, mer, gio, ven, sab, dom. Lowercase matches well.
