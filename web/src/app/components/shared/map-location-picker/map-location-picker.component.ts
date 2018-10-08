import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mapLocationPicker',
  templateUrl: './map-location-picker.component.html',
  styleUrls: ['./map-location-picker.component.scss']
})
export class MapLocationPickerComponent implements  AfterViewInit {

  // TODO set placeData as output to view
  PlaceData : google.maps.places.PlaceResult

  @Output() onChange : EventEmitter<google.maps.places.PlaceResult> = new EventEmitter();

  @ViewChildren("gmap", { read : ElementRef}) gmapElements : QueryList<ElementRef>
  map: google.maps.Map
  marker : google.maps.Marker

  autocomplete : google.maps.places.AutocompleteService
  searchResults : Array<google.maps.places.AutocompletePrediction> = []
  geocoder : google.maps.Geocoder 

  searchString : string

  constructor() {
    this.geocoder = new google.maps.Geocoder
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit")  
    let mapElems = this.gmapElements.toArray()
    if(mapElems.length > 0) {
      this.LoadMap(mapElems[0])
    }
  }

  LoadMap(gmapElement) {
    console.log("mapElem", gmapElement)
    let self = this

    var mapProp = {
      center: new google.maps.LatLng(24.0624125, -100.8401745),
      zoom: 5.5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    let markerData = {
      position: new google.maps.LatLng(24.0624125, -100.8401745),
      draggable : true,
      clickable : false,
      map: null
    }

    this.map = new google.maps.Map(gmapElement.nativeElement, mapProp)
    markerData.map = this.map

    this.marker = new google.maps.Marker(markerData)
    this.marker.addListener('dragend', function() {
      console.log("Location", self.marker.getPosition())

      let geocoderRequest : google.maps.GeocoderRequest = {
        location : self.marker.getPosition()
      }
      
      // Get GEOCODER Data
      self.geocoder.geocode(geocoderRequest, function(results : google.maps.GeocoderResult[], status : google.maps.GeocoderStatus) {
        if(status == google.maps.GeocoderStatus.OK) {
          console.log(results)
          let service = new google.maps.places.PlacesService(self.map);

          // Get PLACE Data
          service.getDetails({
            placeId: results[0].place_id
          }, function(place : google.maps.places.PlaceResult, status : google.maps.places.PlacesServiceStatus) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              console.log(place)

              // Set output
              self.PlaceData = place
              self.onChange.emit(self.PlaceData)

              self.marker.setPosition(place.geometry.location)
              self.map.setCenter(place.geometry.location)
              self.searchString = place.formatted_address
            }
            else {
              console.error("Error while using Place Services")
            }
          })
        }
        else {
          console.error("Geocoder Request failed")
        }
      })
    })
  }

  SearchPredictions() {
    this.autocomplete = new google.maps.places.AutocompleteService();

    let self = this;
    this.autocomplete.getPlacePredictions({
      input: this.searchString,
      componentRestrictions: {
        country: 'MX',
      }
    }, (predictions, status) => {
      console.log(predictions)
      console.log(status)

      self.searchResults = [];
      if (predictions != null && predictions.length > 0) {
        predictions.forEach(function (prediction) {
          self.searchResults.push(prediction);
        });

      }
    });
  }

  UseSearchResult(i) {
    let self = this

    let result = this.searchResults[i]
    let service = new google.maps.places.PlacesService(this.map);

    service.getDetails({
      placeId: result.place_id
    }, function(place : google.maps.places.PlaceResult, status : google.maps.places.PlacesServiceStatus) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        console.log(place)

        // Set output
        self.PlaceData = place
        self.onChange.emit(self.PlaceData)

        self.marker.setPosition(place.geometry.location)
        self.map.setCenter(place.geometry.location)
        self.map.setZoom(15)
        self.searchString = place.formatted_address
      }
      else {
        console.error("Error while using Place Services")
      }

    })

    self.searchResults = []
  }

}
