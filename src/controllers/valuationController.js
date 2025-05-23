

export default function computePrice(basePrice, cond) {
    let price = basePrice;

    if (cond.switchingOn === 'No') return 0;

    // 2. Call functionality
    if (cond.callFunctionality === 'No') price -= 5000;

    // 3. Display issue?
    if (cond.displayIssue === 'Yes') price -= 7000;

    // 4. Screen details
    switch (cond.screenDetails) {
        case 'Original': break;           
        case 'Changed (Compatible)': price -= 8000; break;
        case 'Changed but Original (Bill Req)':
            price -= 5000; break;
    }


    if (cond.repairHistory === 'Yes') price -= 3000;


    return Math.max(0, price);
}