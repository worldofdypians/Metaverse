const shortAddress = (address) => {
    if (address?.length > 8) {
        return `${address.slice(0, 12)}...${address.slice(-4)}`;
    }
    return address;
}

export {
    shortAddress
};