export const agencySelectionValues = [
  { value: '', label: '' },
  { value: '500', label: 'Test Agency' },
  { value: '600', label: 'Test Agency II' }
];

export const sortingOptions = [
  { value: '', label: '' },
  { value: 'Low to High', label: 'Low to High' },
  { value: 'High to Low', label: 'High to Low' },
  { value: 'Last Name A-Z', label: 'Last Name A-Z' },
  { value: 'Last Name Z-A', label: 'Last Name Z-A' }
];

export const mockData = [
  {
    agencyName: 'Test Agency',
    agencyId: 500,
    agents: [
      {
        agentId: 501,
        firstName: 'John',
        lastName: 'Doe',
        members: 2300,
        startDate: '09/21/2019',
        endDate: '09/21/2020',
        membersList: [
          {
            Ancillary: 575,
            Group: 575,
            Under65: 575,
            Over65: 575
          }
        ]
      },
      {
        agentId: 502,
        firstName: 'Bobby',
        lastName: 'Gardner',
        members: 2100,
        startDate: '08/02/2019',
        endDate: '08/02/2020',
        membersList: [
          {
            Ancillary: 525,
            Group: 525,
            Under65: 525,
            Over65: 525
          }
        ]
      },
      {
        agentId: 503,
        firstName: 'Ally',
        lastName: 'Farmen',
        members: 2000,
        startDate: '07/12/2019',
        endDate: '07/12/2020',
        membersList: [
          {
            Ancillary: 500,
            Group: 500,
            Under65: 500,
            Over65: 500
          }
        ]
      },
      {
        agentId: 504,
        firstName: 'Jessica',
        lastName: 'Stevens',
        members: 2212,
        startDate: '03/08/2019',
        endDate: '03/08/2020',
        membersList: [
          {
            Ancillary: 553,
            Group: 553,
            Under65: 553,
            Over65: 553
          }
        ]
      },
      {
        agentId: 505,
        firstName: 'Andy',
        lastName: 'Pike',
        members: 2400,
        startDate: '02/15/2019',
        endDate: '02/15/2020',
        membersList: [
          {
            Ancillary: 600,
            Group: 600,
            Under65: 600,
            Over65: 600
          }
        ]
      }
    ]
  },
  {
    agencyName: 'Test Agency II',
    agencyId: 600,
    agents: [
      {
        agentId: 601,
        firstName: 'Billy',
        lastName: 'Crank',
        members: 1300,
        startDate: '02/15/2019',
        endDate: '02/15/2020',
        membersList: [
          {
            Ancillary: 325,
            Group: 325,
            Under65: 325,
            Over65: 325
          }
        ]
      },
      {
        agentId: 602,
        firstName: 'Ashley',
        lastName: 'Babykin',
        members: 1100,
        startDate: '03/12/2019',
        endDate: '03/12/2020',
        membersList: [
          {
            Ancillary: 275,
            Group: 275,
            Under65: 275,
            Over65: 275
          }
        ]
      },
      {
        agentId: 603,
        firstName: 'Suzy',
        lastName: 'Lu',
        members: 2000,
        startDate: '01/01/2019',
        endDate: '01/01/2020',
        membersList: [
          {
            Ancillary: 500,
            Group: 500,
            Under65: 500,
            Over65: 500
          }
        ]
      },
      {
        agentId: 604,
        firstName: 'Mary',
        lastName: 'White',
        members: 1212,
        startDate: '11/11/2019',
        endDate: '11/11/2020',
        membersList: [
          {
            Ancillary: 303,
            Group: 303,
            Under65: 303,
            Over65: 303
          }
        ]
      },
      {
        agentId: 605,
        firstName: 'Chris',
        lastName: 'Stevens',
        members: 2450,
        startDate: '03/22/2019',
        endDate: '03/23/2020',
        membersList: [
          {
            Ancillary: 612,
            Group: 612,
            Under65: 612,
            Over65: 612
          }
        ]
      }
    ]
  }
];
