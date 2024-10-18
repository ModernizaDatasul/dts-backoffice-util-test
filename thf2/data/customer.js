module.exports = {

    get(paramPath, queryParam, database) {
        console.log('Custom Script GET');
        console.log('ParamPath:', paramPath);
        console.log('QueryParam:', queryParam);
        //console.log('Database:', database);

        let totStatus = [];
        database.forEach(customer => {
            let status = totStatus.find(st => st.status === customer.status);
            if (!status) {
                totStatus.push({ status: customer.status, total: 1 });
            } else {
                status.total += 1;
            }
        });

        //let seconds = 60*4;
        //var waitTill = new Date(new Date().getTime() + seconds * 1000);
        //while(waitTill > new Date()){}

        return {
            statusCode: 200,
            response: {
                items: totStatus
            }
        }
    },

    post(paramPath, queryParam, payload, database) {
        console.log('Custom Script POST');
        console.log('ParamPath:', paramPath);
        console.log('QueryParam:', queryParam);
        console.log('Payload:', payload);
        //console.log('Database:', database);

        let custCode = paramPath.idParam ? paramPath.idParam : 0;
        custCode = custCode == 0 ? payload.code : custCode;

        console.log("CustCode:", custCode);

        let customer = database.find(cust => cust.code == custCode);

        if (customer) {
            let newStatus = customer.status == payload.status ? payload.status + 1 : payload.status;
            if (newStatus < 1 || newStatus > 3) { newStatus = 1; }
            customer.status = newStatus;
        } else {
            customer = {};
        }

        console.log("customer:", customer);

        return {
            statusCode: 200,
            response: customer,
            database: database
        }
    }
};
