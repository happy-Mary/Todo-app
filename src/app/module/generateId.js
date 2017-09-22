export default function gererateId() {
    function guid() {
        return parseInt(Math.random() * 100) % 100;
    }
    const id = `${guid()}${guid()}${guid()}`;
    return id;
}