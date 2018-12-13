import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList, Input, Output, EventEmitter, NgZone } from '@angular/core';

import {} from "googlemaps";

@Component({
  selector: 'mapLocationPicker',
  templateUrl: './map-location-picker.component.html',
  styleUrls: ['./map-location-picker.component.scss']
})
export class MapLocationPickerComponent implements  AfterViewInit {

  // TODO set placeData as output to view
  PlaceData : google.maps.places.PlaceResult

  @Input() isFuzzy : boolean = false
  @Input() readOnly : boolean = false

  @Input('point') 
  set Point(point : google.maps.LatLng) {
    this.point = point
    this.GetPointData()
  }
  get Point() : google.maps.LatLng {
    return this.point
  }

  point : google.maps.LatLng = null
  
  // Fuzzyness
  rn : number = 0.002 // 200 Meters


  @Output() onChange : EventEmitter<google.maps.places.PlaceResult> = new EventEmitter();

  @ViewChildren("gmap", { read : ElementRef}) gmapElements : QueryList<ElementRef>
  map: google.maps.Map
  marker : google.maps.Marker

  autocomplete : google.maps.places.AutocompleteService
  searchResults : Array<google.maps.places.AutocompletePrediction> = []
  geocoder : google.maps.Geocoder 

  searchString : string

  constructor(public zone : NgZone) {
    this.geocoder = new google.maps.Geocoder
  }

  ngOnInit() {
    this.readOnly = this.isFuzzy
  }

  ngAfterViewInit() {
    console.log("ngAfterViewInit")  
    
    let mapElems = this.gmapElements.toArray()
    if(mapElems.length > 0) {
      this.LoadMap(mapElems[0])
    }
  }

  GetPointData() {
    let self = this

    if(this.point != null) {
      let geocoderRequest : google.maps.GeocoderRequest = {
        location : this.point
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

              self.zone.run(() => {
                if(self.marker != null) {
                  self.marker.setPosition(place.geometry.location)
                }
                self.map.setCenter(place.geometry.location)
                self.map.setZoom(14)
                self.searchString = place.formatted_address
              })
            }
            else {
              console.log("Error while using Place Services")
              self.zone.run(() => {
                self.searchString = null
              })
            }
          })
        }
        else {
          console.log("Geocoder Request failed")
          self.zone.run(() => {
            self.searchString = null
          })
        }
      })
    }
  }

  LoadMap(gmapElement) {
    console.log("mapElem", gmapElement)
    let self = this

    this.map = new google.maps.Map(gmapElement.nativeElement, {
      center: this.point ? this.point : new google.maps.LatLng(24.0624125, -100.8401745),
      zoom: 5.5,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    })
    this.GetPointData()


    if(this.isFuzzy) {
      let mLat = Math.random()*(2*this.rn) + (this.point.lat() - this.rn)
      let mLng = Math.random()*(2*this.rn) + (this.point.lng() - this.rn)

      let markerData = new google.maps.Circle({
        strokeColor: '#DC2D26',
        strokeOpacity: 0.85,
        strokeWeight: 0.5,
        fillColor: '#F03E22',
        fillOpacity: 0.35,
        map: this.map,
        center: new google.maps.LatLng(mLat, mLng),
        radius: 1000
      });

      this.map.setZoom(15)

      console.log(markerData)
    }
    else {
      let markerData = {
        position: this.point ? this.point : new google.maps.LatLng(24.0624125, -100.8401745),
        draggable : true,
        clickable : false,
        map: this.map
      }
  
      markerData.map = this.map
  
      this.marker = new google.maps.Marker(markerData)
      this.marker.addListener('dragend', function() {
        console.log("Location", self.marker.getPosition())
        self.point = self.marker.getPosition()
        self.GetPointData()
      })
    }

    
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

        if(self.marker != null) {
          self.marker.setPosition(place.geometry.location)
        }
        self.map.setCenter(place.geometry.location)
        self.map.setZoom(14)
        self.searchString = place.formatted_address
      }
      else {
        console.error("Error while using Place Services")
      }

    })

    self.searchResults = []
  }

}
