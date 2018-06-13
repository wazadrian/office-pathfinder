using System.Collections.Generic;
using Android.Content;
using Android.Runtime;
using Android.Views;
using Android.Widget;
using Java.Lang;
using MobileBackend.Models;

namespace PathFinder.Adapters
{
    internal class EmployeeItemAdapter : BaseAdapter
    {
        private readonly Context context;
        private readonly List<Employee> employees;

        public EmployeeItemAdapter(Context context, List<Employee> employees)
        {
            this.context = context;
            this.employees = employees;
        }
        
        public override int Count => employees.Count;

        public override Object GetItem(int position)
        {
            return null;
        }

        public override long GetItemId(int position)
        {
            return employees[position].employeeId;
        }

        public override View GetView(int position, View convertView, ViewGroup parent)
        {
            var view = convertView;
            var inflater = context.GetSystemService(Context.LayoutInflaterService).JavaCast<LayoutInflater>();

            view = inflater.Inflate(Resource.Layout.listItemLayout, parent, false);
            var Title = view.FindViewById<TextView>(Resource.Id.Title);
            var TitleCd = view.FindViewById<TextView>(Resource.Id.TitleCd);

            Title.Text = employees[position].employeeName;
            TitleCd.Text = employees[position].employeeSurname;

            return view;
        }
    }

    internal class ListItemAdapterViewHolder : Object
    {
        //Your adapter views to re-use
        public TextView Title { get; set; }
        public TextView TitleCd { get; set; }
    }
}