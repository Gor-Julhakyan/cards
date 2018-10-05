angular.module('cardsApp', ['ngAnimate'])
  .controller('CardsListController', function ($scope, $window) {
    this.data= [];
    this.imgBase = './assets/img/';

    //Fetching Data from JSON
    fetch('./assets/storage/data.json')
      .then(response => {
        if (response.status !== 200) {
          console.log(`UPS!!! \n Looks like there was a problem. Status Code: ${response.status}`)
          return
        }
        response.json().then(data => {
          this.data = data
          $scope.$apply()
        })
      })
    
     // View Styles for Card Raitings 
    this.raitingsProps = [
      { color: '#607D8B', icon: 'far fa-star'},
      { color: '#2196F3', icon: 'far fa-star'},
      { color: '#9C27B0', icon: 'fas fa-star-half-alt'},
      { color: '#FF9800', icon: 'fas fa-star'},
      { color: '#FF5722', icon: 'fas fa-star'}
    ]

    // Limit Descruiption/Title Text on line 3
    this.descTextLimit = 66;

    // Set Slider View based on Device Type and Orientation
    this.sliderViewInit = ()=> {
      let deviceType = window.navigatorDetect.a.type;
      let orientation = screen.msOrientation || (window.screen.orientation || screen.orientation || screen.mozOrientation || {}).type;

      switch(deviceType) {
        case 'mobile':
          this.sliderMin = 0;
          if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
            this.sliderMax = 2;
          } else if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') {
            this.sliderMax = 1;
          }
          break;
        case 'tablet':
          this.sliderMin = 0;
          if (orientation === 'landscape-primary' || orientation === 'landscape-secondary') {
            this.sliderMax = 4;
          } else if (orientation === 'portrait-primary' || orientation === 'portrait-secondary') {
            this.sliderMax = 3;
          }
          break;
        case 'desktop':
          this.sliderMin = 0;
          this.sliderMax = Math.floor((window.innerWidth - 100) / 210) >= 5 ? 5 : Math.floor((window.innerWidth - 100) / 210);
          break;
        default:
          this.sliderMin = 0;
          this.sliderMax = 1;
      }
    }

    // Init Slider View
    this.sliderViewInit();
    var w = angular.element($window)  
  
    // Watch window resize and Rerender Slider
    w.bind('resize', () => {
      console.log('RESIZE')
      this.sliderViewInit();
      $scope.$apply()
    });

    // Slider left Button
    this.slideLeft = () => {
      if (this.sliderMin > 0 && this.sliderMax <= this.data.length) {
        this.sliderMin--;
        this.sliderMax--;
      }
    }

    // Slider Right Button
    this.slideRight = () => {
      if (this.sliderMin >= 0 && this.sliderMax < this.data.length) {
        this.sliderMin++;
        this.sliderMax++;
      }
    }

  })
