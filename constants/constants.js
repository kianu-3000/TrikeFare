const Constants = {

    COLORS: {
        RED: '#EF4136',
        BLACK: '#050505',
        GRAYISH_WHITE: '#E8E8E8',
        RED: '#D33333',
        RED_TINT: 'rgba(211, 51, 51, 0.15)',
        DARK_RED: '#802626',
        WHITE: '#FFFFFF',
        FADED_BLACK: '#343341',
        BLUE: '#277fcf',
        GREEN: '#45de5c',
        YELLOW: '#f2d635',
        GRAY: '#777777'
    },

    SIZE: {
        REGULAR: 16,
        HEADINGS: 32,
        LARGE: 45,
        LABELS: 12,
        SMALL: 10,
        MEDIUM: 24,
        X_MEDIUM: 20
    },

    PADDING:{
        REGULAR: 24,
        MEDIUM: 40,
        LARGE: 80,
        SMALL: 12,
        X_SMALL: 5
    },
    MARGIN:{
        REGULAR: 24,
        MEDIUM: 40,
        LARGE: 80,
        SMALL: 12
    },

    BORDERS: {
        RADIUS_SMALL: 20,
        RADIUS_NORMAL: 24,
        RADIUS_LARGE: 40
    },

    API_ROUTE: {
        API_ENDPOINT: "http://192.168.1.24:8000/api",
        // API_ENDPOINT: "http://10.0.2.2:8000/api",
        API_MAPS: "https://api.openrouteservice.org/"
    },
    STATUS_CODE: {
        OK: 200,
        CREATED: 201,
        NOT_FOUND: 404,
        BAD_REQUEST: 400,
        INTERNAL_SERVER: 500
    },
    API_KEY: {
        OPEN_ROUTE_SERVICE: 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6ImM2ZjFmMzkyMmJhNDQzNDg4MjU2YTY5NzBkZWVmZDVkIiwiaCI6Im11cm11cjY0In0=',
        MAP_TILER: 'PXgcExy1xLEgxcR82Uip'
    },
    PIN_TYPE: {
        PICK_UP: 'pickUp',
        DROP_OFF: 'dropOff'
    }

}

export { Constants };