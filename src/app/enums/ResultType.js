/**
 * Enum for marking successful and failed tests
 * 
 * @enum {ResultType}
 * @returns {ResultType}
 */
const ResultType = {
    /**
     * When a test succeeded (green)
     * @var {ResultType} SUCCESS
     */
    SUCCESS: "success",

    /**
     * When a test failed (red)
     * @var {ResultType} ERROR
     */
    ERROR: "error",
};