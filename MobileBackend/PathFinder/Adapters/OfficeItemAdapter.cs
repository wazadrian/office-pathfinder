using System.Collections.Generic;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Java.Lang;
using MobileBackend.Models;

namespace PathFinder.Adapters
{
    internal class OfficeItemAdapter : BaseAdapter
    {
        private readonly Context context;
        private readonly List<Office> offices;

        public OfficeItemAdapter(Context context, List<Office> offices)
        {
            this.context = context;
            this.offices = offices;
        }

        public override int Count => offices.Count;

        public override Object GetItem(int position)
        {
            return null;
        }

        public override long GetItemId(int position)
        {
            return offices[position].employeeId;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            var view = convertView;
            var inflater = context.GetSystemService(Context.LayoutInflaterService).JavaCast<LayoutInflater>();

            view = inflater.Inflate(Resource.Layout.listItemLayout, parent, false);
            var Title = view.FindViewById<TextView>(Resource.Id.Title);
            var TitleCd = view.FindViewById<TextView>(Resource.Id.TitleCd);

            Title.Text = offices[position].officeName;
            TitleCd.Text = offices[position].officeNumber.ToString();

            return view;
        }
    }

    internal class OfficeItemAdapterViewHolder : Object
    {
        //Your adapter views to re-use
        public TextView Title { get; set; }

        public TextView TitleCd { get; set; }
    }
}