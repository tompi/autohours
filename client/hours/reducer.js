
var days = [
  {
    name: 'Mon',
    locations: [
      {percent: 22, color: '#f5a3a3', text: 'hei'},
      {percent: 3, color: 'none', text: ''},
      {percent: 50, color: '#acacac', text: 'ho'},
      {percent: 3, color: 'none', text: ''},
      {percent: 22, color: '#3C633C', text: 'ho'}
    ]
  },
  {
    name: 'Tue',
    locations: [
      {percent: 27, color: '#f5a3a3', text: 'hei'},
      {percent: 3, color: 'none', text: ''},
      {percent: 40, color: '#acacac', text: 'ho'},
      {percent: 3, color: 'none', text: ''},
      {percent: 27, color: '#3C633C', text: 'ho'}
    ]
  }
];

var locations = [
  { color: '#3C633C', "lat":58.9403823, "lon":5.7410811 },
  { color: '#f5a3a3', "lat":58.9502506, "lon":5.725163 },
  { color: '#acacac', "lat":58.9419214,"lon":5.7453025 }
];

export default function() {
    return {
      days,
      locations
    };
}
