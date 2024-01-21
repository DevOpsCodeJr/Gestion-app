export const Global = {
  actionType: [{ TOGGLE_THEME: "TOGGLE_THEME" }],
  clients: {
    columns: [
      {
        header: "Full Name",
        accessorKey: "fullName",
        footer: "Full Name",
      },
      {
        header: "Phone Number",
        accessorKey: "phoneNumber",
        footer: "Phone Number",
      },
      {
        header: "Address",
        accessorKey: "address",
        footer: "Address",
      },
      {
        header: "Date Init",
        accessorKey: "dateInit",
        footer: "Date Init",
      },
      {
        header: "Payment Method",
        accessorKey: "paymentMethod",
        footer: "Payment Method",
      },
      {
        header: "Amount",
        accessorKey: "amount",
        footer: "Amount",
      },
      {
        header: "Debt",
        accessorKey: "debt",
        footer: "Debt",
      },
      {
        header: "Client Number",
        accessorKey: "clientNumber",
        footer: "Client Number",
      },
      {
        header: "Comments",
        accessorKey: "comments",
        footer: "Comments",
      },
    ],
    endpoint: "clients",
    register: {
      type: "Agregar Cliente",
      title: "Ingresar Cliente",
      data: [
        { type: "text", title: "Nombre Completo", name: "fullName" },
        { type: "text", title: "Numero de Telefono", name: "phoneNumber" },
        { type: "text", title: "Direccion", name: "address" },
        { type: "date", title: "Fecha de Inicio", name: "dateInit" },
        { type: "text", title: "Metodo de Pago", name: "paymentMethod" },
        { type: "number", title: "Cantidad", name: "amount" },
        { type: "text", title: "Deuda", name: "debt" },
        { type: "number", title: "Numero de Cliente", name: "clientNumber" },
        { type: "text", title: "Comentarios", name: "comments" },
      ],
    },
    delete: {
      type: "Eliminar Cliente",
      title: "Eliminar Cliente",
      data: [{ type: "number", title: "Numero de Cliente" }],
    },
  },
  dgi: {
    columns: [
      {
        header: "Fecha",
        accessorKey: "date",
        footer: "Fecha",
      },
      {
        header: "Provedor",
        accessorKey: "provider",
        footer: "Provedor",
      },
      {
        header: "N. Factura",
        accessorKey: "invoiceNumber",
        footer: "N. Factura",
      },
      {
        header: "Subtotal Pesos",
        accessorKey: "subTotalLocal",
        footer: "Subtotal Pesos",
      },
      {
        header: "IVA Pesos",
        accessorKey: "ivaLocal",
        footer: "IVA Pesos",
      },
      {
        header: "Total Pesos",
        accessorKey: "totalLocal",
        footer: "Total Pesos",
      },
      {
        header: "Subtotal DPesos",
        accessorKey: "subTotalDLocal",
        footer: "Subtotal DPesos",
      },
      {
        header: "IVA DPesos",
        accessorKey: "ivaDLocal",
        footer: "IVA DPesos",
      },
      {
        header: "Total DPesos",
        accessorKey: "totalDLocal",
        footer: "Total DPesos",
      },
      {
        header: "Subtotal USD",
        accessorKey: "subTotal",
        footer: "Subtotal USD",
      },
      {
        header: "IVA USD",
        accessorKey: "iva",
        footer: "IVA USD",
      },
      {
        header: "Total USD",
        accessorKey: "total",
        footer: "Total USD",
      },
    ],
    endpoint: "dgi",
    register: {
      type: "Agregar Factura",
      title: "Ingresar Factura",
      data: [
        { type: "string", title: "Fecha", name: "date" },
        { type: "string", title: "Provedor", name: "provider" },
        { type: "number", title: "N. Factura", name: "invoiceNumber" },
        { type: "number", title: "Subtotal Pesos", name: "subTotalLocal" },
        { type: "number", title: "IVA Pesos", name: "ivaLocal" },
        { type: "number", title: "Total Pesos", name: "totalLocal" },
        { type: "number", title: "Subtotal DPesos", name: "subTotalDLocal" },
        { type: "number", title: "IVA DPesos", name: "ivaDLocal" },
        { type: "number", title: "Total DPesos", name: "totalDLocal" },
        { type: "number", title: "Subtotal USD", name: "subTotal" },
        { type: "number", title: "IVA USD", name: "iva" },
        { type: "number", title: "Total USD", name: "total" },
      ],
    },
    delete: {
      type: "Eliminar Factura",
      title: "Eliminar Factura",
      data: [{ type: "number", title: "N. Factura" }],
    },
  },
  orders: {
    endpoint: "tasks",
    register: {
      type: "Agregar Orden",
      title: "Ingresar Orden",
    },
    delete: {
      type: "Eliminar Orden",
      title: "Eliminar Orden",
      data: [{ type: "number", title: "Numero de Orden" }],
    },
  },
  backend: "http://localhost:3000/api/v1/",
};
