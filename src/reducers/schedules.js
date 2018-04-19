import { ActionTypes } from '../config/constants';

const initialState = {
  developer: '',
  mode:'summary',
  developerTimes: [],
  groupedAggregate: [],
  scheduleAggregate:[],
  loading: true,
  query: {}
};

function transformName(name) {
  const names = name.split(' ');
  return names[0].substring(0, 1).toLowerCase() + names[1].toLowerCase();
}

function transformScheduleData(scheduleData) {
  const resultSet = [];
  var counter = 0;
  scheduleData.forEach(function(series) {
    series.data.forEach(function(developer) {
      var tmpData = { "name" : developer.x, "username" : transformName(developer.x) };
      tmpData[series.name] = developer.y ;
      resultSet[counter] = Object.assign(tmpData, resultSet[counter]);
      counter++;
    });
    counter=0;
  });
  return resultSet;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SCHEDULE_DEVELOPER_WEEK_SUBSCRIBE:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.SCHEDULE_DEVELOPER_WEEK_UPDATE:
      return {
        ...state,
        loading: false,
        developer: {
          ...state.developer,
          developer: action.payload.developer,
        },
        developerTimes: {
          ...state.developerTimes,
          developerTimes: action.payload.developertimes,
        },
        groupedAggregate: {
          ...state.groupedAggregate,
          developerTimes: action.payload.groupedaggregate,
        },
        scheduleAggregate: {
          ...state.scheduleAggregate,
          scheduleAggregate: action.payload.scheduleaggregate,
        },
        mode: 'developer'

      };


    case ActionTypes.SCHEDULE_SUMMARY_WEEK_SUBSCRIBE:
      return {
        ...state,
        loading: true,
      };

    case ActionTypes.SCHEDULE_SUMMARY_WEEK_UPDATE:

      return {
        ...state,
        loading: false,
        developer: {
          ...state.developer,
          developer: action.payload.developer,
        },
        developerTimes: {
          ...state.developerTimes,
          developerTimes: action.payload.developertimes,
        },
        groupedAggregate: {
          ...state.groupedAggregate,
          developerTimes: action.payload.groupedaggregate,
        },
        scheduleAggregate: {
          ...state.scheduleAggregate,
          scheduleAggregate: transformScheduleData(action.payload.scheduleaggregate),
        },
        mode: 'summary'

      };

    default:
      return state;
  }
};
