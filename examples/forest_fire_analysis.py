def _get_count_features(feature, forest_space, country_forest_count_list):
    geometry = feature["geometry"]
    count = 0
    # Using Data Hub spatial search using geometry
    for _ in forest_space.spatial_search_geometry(data=geometry):
        count += 1
    feature["properties"]["fire_count"] = count
    country_forest_count_list.append(feature)
    return str(count) + " " + feature["properties"]["name"]
