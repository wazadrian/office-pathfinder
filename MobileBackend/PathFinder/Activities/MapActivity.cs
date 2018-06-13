using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Android.App;
using Android.Content;
using Android.OS;
using Android.Runtime;
using Android.Views;
using Android.Widget;

namespace PathFinder.Activities
{
    [Activity(Label = "MapActivity")]
    public class MapActivity : Activity
    {
        protected override void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            SetContentView(Resource.Layout.mapLayout);
            
            var mapImageView = FindViewById<ImageView>(Resource.Id.mapImageView);
            mapImageView.SetImageResource(Resource.Drawable.map);

            var homeButton = FindViewById<Button>(Resource.Id.homeButton);
            homeButton.Click += (e, o) =>
            {
                var nextActivity = new Intent(this, typeof(MainActivity));
                StartActivity(nextActivity);
            };
        }
    }
}