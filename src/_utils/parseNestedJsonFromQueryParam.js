export default function parseNestedJsonFromQueryParam(queryParamObject) {
  Object.keys(queryParamObject).forEach((key) => {
    if (queryParamObject[key].includes('{') && queryParamObject[key].includes('}')) {
      queryParamObject[key] = JSON.parse(queryParamObject[key]);
    }
  });

  return queryParamObject;
}